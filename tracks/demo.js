export default {
    page: {
        path: 'pages/demo/index',
        pageName: 'home'
    },
    elementTracks: [
        {
            element: '.test',
            dataKeys: ['a']
        },
        {
            element: '.test1',
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