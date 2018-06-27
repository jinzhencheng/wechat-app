//app.js
App({

  onLaunch: function(){
    var that = this
    that.login()
  }
  ,
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        wx.request({
          url: `${that.globalData.server}/openId/fetch`,
          method: "GET",
          data: {
            code: res.code
          },
          success: function (res) {
            if (res.data["open_id"]) {
              var openId = res.data["open_id"]
              wx.setStorageSync("openId", openId)
            }
          },
          fail: function () {
            that.error()
          }
        })
      }
    })
  },

  share: function(path){
    return{
      title: "北漂的临邑人 一个为临邑老乡租车回家提供方便的平台",
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
    server: "http://localhost:5000"
  }
})
