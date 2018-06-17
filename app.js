//app.js
App({
  onLaunch: function () {
      wx.login({
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        success: function(res) {
          wx.setStorageSync("code", res.code)
          console.log(res)
        },
        fail:function(res){
          console.log("fail")
          console.log(res)
        }
      })
  },
  globalData: {
    server: 'http://localhost:5000'
  }
})