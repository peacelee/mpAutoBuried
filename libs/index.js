import Wrapper from './wrapper';
import {
    getBoundingClientRect,
    isClickTrackArea,
    getActivePage
} from './utils';
import report from './report';

class Tracker extends Wrapper {
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
        // elementTracker变量名尽量不要修改，因为他和wxml下的名字是相对应的
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
                            console.log('data:', data);
                            console.log('===================')
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
        return (currentPage, methodName, args = {}) => {
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
                    console.log('data:', data);
                    console.log('===================')
                    // report(track, buried);
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