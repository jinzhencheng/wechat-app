var app = getApp()
var defaultPrePath = "/pages/index/index"
var redirectPath = defaultPrePath
Page({

  data:{},

  onLoad: function(options){
    var that = this
    var prePath = options["prePath"]
    if(prePath){
      redirectPath = prePath
    }
  },

  addUser: function(userInfo, openId){
    wx.request({
      url: `${app.globalData.server}/user/add`,
      method: "POST",
      data:{
        avatarUrl: userInfo["avatarUrl"],
        nickName: userInfo["nickName"],
        city: userInfo["city"],
        province: userInfo["province"],
        gender: userInfo["gender"],
        openId: openId,
        country: userInfo["country"]
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(200 === res.statusCode){
          app.success()
          wx.switchTab({
            url: redirectPath,
          })
        }
      },
      fail: function () {
        app.error()
      }
    })
  },


  getUserBase:function(res){
    var that = this
    if(res.detail["errMsg"].search("fail") != -1){
      app.fail()
      return 
    }
    var userInfo = res.detail["userInfo"]
    console.log(userInfo)
    wx.setStorageSync("userInfo", userInfo)
    var openId = wx.getStorageSync("openId")
    if(!openId){
      app.login()
      openId = wx.getStorageSync("openId")
    }
    that.addUser(userInfo, openId)
  },
})