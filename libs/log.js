/**
 * @description: 找到页面的埋点数据
 * @param {Array}  keys 需要上报的埋点数据
 * @param {Object} buried 页面中定义的埋点数据
 * @param {Object} dataset xml接口上自定义的数据
 * @return {Object} 需要上报的参数集合
 */
const findLogParams = (keys, buried, dataset, page) => {
    let params = dataset || {};
    keys.forEach(item => {
        try {
            buried[item] && (params[item] = buried[item])
        } catch (err) {
            err += ' at ' + page.path;
            console.error(err)
        }
    });
    return params
}

/**
 * @description: 点击埋点上报
 * @param {Object} page 页面的路径和名称 
 * @param {Array}  keys 需要上报的埋点数据
 * @param {Object} buried 页面中定义的埋点数据
 * @param {Object} dataset xml接口上自定义的数据
 * @param {String} clickId 点击名称 
 * @return {Void}
 */
const clickBuried = (page, keys, buried, dataset, clickId) => {
    let log = {
        type: 'wechat_app_click',
        page: page,
        clickId: clickId,
        clickPar: findLogParams(keys, buried, dataset, page)
    };
    console.log('clickBuried:', log, page)
    // reportClickBuried(log)
}

/**
 * @description: PV埋点上报
 * @param {Object} page 页面的路径和名称 
 * @param {Array}  keys 需要上报的埋点数据
 * @param {Object} buried 页面中定义的埋点数据
 * @param {Object} dataset xml接口上自定义的数据
 * @return {Void}
 */
const pvBuried = (page, keys, buried, dataset) => {
    let log = {
        type: 'wechat_app_pv',
        page: page,
        pagePar: findLogParams(keys, buried, dataset, page)
    };
    console.log('pvBuried:', log)
    // reportClickBuried(log)
}

/**
 * @description: 上报数据
 * @param {Object} buried 埋点需要的数据，再页面里预先定义好。
 * @param {Object} page 包含当前页面路径和名称
 * @param {track} track 包含需要上报的参数，监听元素名或者方法名称。
 * @param {dataset} dataset 包含需要上报元素上自定义的参数。
 * @return: 
 */
export const log = ({
    buried,
    page,
    track,
    dataset
}) => {
    let {
        dataKeys,
        clickId
    } = track;
    if (clickId) {
        // 上报click埋点
        clickBuried(page, dataKeys, buried, dataset, clickId)
    } else {
        // 上报pv埋点
        pvBuried(page, dataKeys, buried, dataset)
    }
}