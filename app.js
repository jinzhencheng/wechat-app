//app.js
App({
  
  share: function(path){
    return{
      title: "临邑人在北京 一个为临邑老乡拼车回家提供方便的平台",
      path: path,
      success: function (res) {
        wx.showToast({
          title: "转发成功",
          image: "/images/app/success.png"
        })
      }
    }
  },

  loading: function(){
    wx.showToast({
      title: '加载中',
      icon: "loading",
      mask: true
    })
  },

  error:function(){
    wx.showModal({
      title: '错误',
      content: '未知错误，你可以尝试将该小程序删除后重新进入。',
      showCancel: false
    })
  },

  fail: function(){
    wx.showToast({
      title: '失败',
      image: "/images/app/fail.png"
    })
  },

  success: function(){
    wx.showToast({
      title: '成功',
      image: "/images/app/success.png"
    })
  },

  warning: function(){
    wx.showModal({
      title: '警告',
      content: '登录状态失效，请重新删除小程序，重新登录',
      showCancel: false
    })
  },

  //TODO: 暂且丢弃该方法，授权时已保存openId
  getOpenId: function(){
    var that = this
    var openId = wx.getStorageSync("openId")
    if (!openId) {
      var code = wx.getStorageSync("code")
      if (!code) {
        that.warning()
        return
      }
      wx.request({
        url: `${that.globalData.server}/openId/fetch`,
        method: "GET",
        data: {
          code: code
        },
        success: function (res) {
          if (res.data["open_id"]) {
            openId = res.data["open_id"]
            wx.setStorageSync("openId", openId)
          }
        },
        fail: function () {
          that.error()
        }
      })
    }
    console.log("openId:",openId)
    return openId
  },

  authorize: function(prePath){
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                wx.setStorageSync("userInfo", res.userInfo)
              },
              fail: function () {
                that.error()
              }
            })
        } else {
          wx.redirectTo({
            url: `/pages/authorization/authorize?prePath=${prePath}`,
          })
        }
      }
    })
  },

  globalData: {
    //server: 'http://118.24.121.119:5000'
    server: "http://localhost:5000"
  }
})