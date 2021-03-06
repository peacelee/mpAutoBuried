import Insert from './insert';
import {
    getBoundingClientRect,
    isClickTrackArea,
    getActivePage
} from './utils';
import {log} from './log';

class Tracker extends Insert {
    constructor({
        tracks
    }) {
        super();
        // 埋点配置信息
        this.tracks = tracks;
        // 自动给每个page增加elementTracker方法，用作元素埋点
        this.addPageMethodExtra(this.elementTracker());
        // 自动给page下预先定义的方法进行监听，用作方法执行埋点
        this.addPageMethodWrapper(this.methodTracker());
    }

    /**
     * @description: 元素埋点
     * @param {Void} 
     * @return {Function}
     */
    elementTracker() {
        // 元素事件监听
        const elementTracker = (e) => {
            const {tracks, page} = this.findActivePageTracks('element');
            const {
                buried
            } = getActivePage();
            tracks.forEach((track) => {
                getBoundingClientRect(track.element).then((res) => {
                    res.boundingClientRect.forEach((item) => {
                        const isHit = isClickTrackArea(e, item, res.scrollOffset);
                        if (isHit) {
                            const data = {
                                buried,
                                page,
                                track,
                                dataset: item.dataset
                            };
                            log(data)
                        }
                    });
                });
            });
        };
        return elementTracker;
    }

    /**
     * @description: 方法埋点
     * @param {Void} 
     * @return {Function}
     */
    methodTracker() {
        return (methodName, args = {}) => {
            const {tracks, page} = this.findActivePageTracks('method');
            const {
                buried
            } = getActivePage();
            const {
                dataset
            } = args.currentTarget || {};
            tracks.forEach((track) => {
                if (track.method === methodName) {
                    const data = {
                        buried,
                        page,
                        track,
                        dataset: dataset
                    }
                    log(data)
                }
            })
        };
    }

    /**
     * @description: 获取当前页面的埋点配置
     * @param {String} type 返回的埋点配置，options: method/element
     * @returns {Object}
     */
    findActivePageTracks(type) {
        try {
            const {
                route
            } = getActivePage();
            const pageTrackConfig = this.tracks.find(item => item.page.path === route) || {};
            let tracks = {};
            if (type === 'method') {
                tracks = pageTrackConfig.methodTracks || [];
            } else if (type === 'element') {
                tracks = pageTrackConfig.elementTracks || [];
            }
            return {
                tracks,
                page: pageTrackConfig.page || {}
            };
        } catch (e) {
            return {};
        }
    }
}

export default Tracker;