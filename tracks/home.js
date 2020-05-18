export default {
    page: {
        path: 'pages/home/index',
        name: 'home'
    },
    elementTracks: [
        {
            element: '.test',
            clickId: 'clickTestBtn',
            dataKeys: ['a']
        },
        {
            element: '.test1',
            clickId: 'clickTest1Btn',
            dataKeys: ['b']
        }
    ],
    methodTracks: [
        {
            method: 'onShow',
            dataKeys: ['a', 'b'],
        }
    ],

}