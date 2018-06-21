var app = getApp()
const defaultPrePath = "/pages/index/index"
Page({

  data:{
    prePath: defaultPrePath
  },

  onLoad: function(options){
    var that = this
    var prePath = options["prePath"]
    if(prePath){
      that.setData({
        prePath: prePath
      })
    }
  },

  getUserInfo:function(res){
    var that = this
    if(res.detail["errMsg"].search("fail") != -1){
      app.fail()
      return 
    }
    app.loading()
    wx.checkSession({
      fail: function(res){
        wx.login({
          success: function(res){
            wx.setStorageSync("code", res.code)
          }
        })
      },
      complete:function(){
        wx.hideToast()
      }
    })   
    
    var detail = res.detail
    wx.setStorageSync("userInfo", detail["userInfo"])
    console.log("wx code:", wx.getStorageSync("code"))
    wx.request({
      url: `${app.globalData.server}/user/add`,
      data: {
        code: wx.getStorageSync("code"),
        encryptedData: detail["encryptedData"],
        iv: detail["iv"]
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res){
        app.success()
        wx.setStorageSync("openId", res.data["open_id"])
        wx.switchTab({
          url: that.data.prePath
        })
      },
      fail: function(res){
        app.error()
      },
      complete: function(){
        wx.hideToast()
      }
    })
  },
   
})