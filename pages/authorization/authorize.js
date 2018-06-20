var app = getApp()
const defaultPrePath = "/pages/index/index"
Page({

  data:{
    prePath: defaultPrePath
  },

  onLoad: function(options){
    var that = this
    var prePath = options["prePath"]
    that.setData({
      prePath: prePath
    })
  },

  getUserInfo:function(res){
    var that = this
    if(res.detail["errMsg"].search("fail") != -1){
      app.fail()
      return 
    }

    var code = wx.getStorageSync("code")
    var detail = res.detail
    wx.setStorageSync("userInfo", detail["userInfo"])
    wx.request({
      url: `${app.globalData.server}/user/add`,
      data: {
        code: code,
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
          url: that.data.prePath,
        })
      },
      fail: function(res){
        app.error()
      }
    })
  },
   
})