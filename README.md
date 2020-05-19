# mpAutoBuried
微信小程序自动化埋点

### 1. 引用
/app.js文件
```javascript
// 埋点库
import Tracker from './libs/index'
// 埋点的描述文件
import trackerDescribe from './tracks/index'
// 初始化埋点
new Tracker({
    tracks: trackerDescribe
})

App({
    onLaunch: function() {

    },
    globalData: {

    }
})
```
### 2. 页面结构
/pages/home/index.wxml
```javascript
<view catchtap="elementTracker">
    <header></header>
    <button class="test">click to store</button>
    <button class="test1">click demo2</button>
</view>
```


### 2. 页面的描述文件
/tracks/home.js
```javascript
export default {
    // 页面
    page: {
        // 页面路径
        path: 'pages/home/index',
        // 页面名称
        name: 'home'
    },
    // 元素埋点
    elementTracks: [
        // 页面元素
        {
            // 埋点的元素
            element: '.test',
            // 点击名称
            clickId: 'clickTestBtn',
            // 上报的参数
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
    // 方法回调
    methodTracks: [
        {
            // 页面触发onShow回调
            method: 'onShow',
            // 回调上报的参数
            dataKeys: ['a', 'b'],
        }
    ]
}
```
