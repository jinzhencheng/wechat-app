//app.js
App({
  onLaunch: function () {
      wx.login({
        success: function(res) {
          wx.setStorageSync("code", res.code)
        },
        fail:function(res){
          wx.showModal({
            title: '错误',
            content: '请求失败，可能是因为你的微信版本过低造成的',
          })
        }
      })
  },

  share: function(path){
    console.log(path)
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

  error:function(){
    wx.showModal({
      title: '错误',
      content: '未知错误,可能是因为你的微信版本过低',
      showCancel: false
    })
  },

  globalData: {
    server: 'http://localhost:5000'
  }
})