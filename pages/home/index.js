Page({
    buried: {
        a: 1,
        b: 2
    },
    data: {

    },
    onLoad: function() {

    },
    onShow: function() {
        
    },
    goToStore() {
        wx.navigateTo({
            url: '/pages/store/index',
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
          
    }
})