export default {
    page: {
        path: 'pages/home/index',
        name: 'home'
    },
    elementTracks: [
        // 页面
        {
            element: '.test',
            clickId: 'clickTestBtn',
            dataKeys: ['a']
        },
        {
            element: '.test1',
            clickId: 'clickTest1Btn',
            dataKeys: ['b']
        },
        // 页面内组件
        {
            element: '.container >>> .header',
            clickId: 'clickHeader',
            dataKeys: ['c']
        }
    ],
    methodTracks: [
        {
            method: 'onShow',
            dataKeys: ['a', 'b'],
        }
    ],

}