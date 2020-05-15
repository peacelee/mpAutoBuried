/**
 * 解析数组类型dataKey
 * 例如list[$INDEX],返回{key:list, index: $INDEX}
 * 例如list[4],返回{key:list, index: 4}
 * @param {*} key
 * @param {*} index
 */
const resolveArrayDataKey = (key, index) => {
    const leftBracketIndex = key.indexOf('[');
    const rightBracketIndex = key.indexOf(']');
    const result = {};
    if (leftBracketIndex > -1) {
        let arrIndex = key.substring(leftBracketIndex + 1, rightBracketIndex);
        const arrKey = key.substring(0, leftBracketIndex);
        if (arrIndex === '$INDEX') {
            arrIndex = index;
        }
        result.key = arrKey;
        result.index = parseInt(arrIndex, 10);
    }
    return result;
};

/**
 * 获取全局数据
 * @param {*} key 目前支持$APP.* $DATASET.* $INDEX
 * @param {*} dataset 点击元素dataset
 * @param {*} index 点击元素索引
 */
const getGlobalData = (key, dataset) => {
    let result = '';
    if (key.indexOf('$APP.') > -1) {
        const App = getApp();
        const appKey = key.split('$APP.')[1];
        result = App[appKey];
    } else if (key.indexOf('$DATASET.') > -1) {
        const setKey = key.split('$DATASET.')[1];
        result = dataset[setKey];
    } else if (key.indexOf('$INDEX') > -1) {
        result = dataset.index;
    }
    return result;
};

const getPageData = (key, dataset = {}, pageData) => {
    const { index } = dataset;
    const keys = key.split('.');
    let result = pageData;
    if (keys.length > -1) {
        keys.forEach((name) => {
            const res = resolveArrayDataKey(name, index);
            if (res.key) {
                result = result[res.key][res.index];
            } else {
                result = result[name];
            }
        });
    } else {
        result = pageData[key];
    }
    return result;
};

const dataReader = (key, dataset, pageData) => {
    try {
        let result = '';
        if (key.indexOf('$') === 0) {
            result = getGlobalData(key, dataset);
        } else {
            result = getPageData(key, dataset, pageData);
        }
        return result;
    } catch (e) {
        console.log(e);
        return '';
    }
};


const report = (track, pageData) => {
    console.log('track:', track);
    console.log('pageData:', pageData)
    const { element, method } = track;
    const logger = [];
    track.dataKeys.forEach(name => {
        const data = dataReader(name, track.dataset, pageData);
        logger.push({ element, method, name, data });
    });
    console.table(logger);
};

export default report;
