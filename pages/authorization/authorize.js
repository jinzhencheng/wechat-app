var app = getApp()
const defaultPrePath = "/pages/index/index"
Page({

  data:{
    prePath: defaultPrePath,
    code: null
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
    wx.login({
      success: function (res) {
        that.setData({
          code: res.code
        })
      }
    })
    
    var detail = res.detail
    wx.setStorageSync("userInfo", detail["userInfo"])
    wx.request({
      url: `${app.globalData.server}/user/add`,
      data: {
        code: that.data.code,
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