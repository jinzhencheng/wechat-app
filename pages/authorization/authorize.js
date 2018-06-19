var app = getApp()
Page({
  getUserInfo:function(res){
    var code = wx.getStorageSync("code")
    var detail = res.detail
    wx.setStorageSync("userInfo", res.detail["userInfo"])
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
        wx.navigateBack()
      },
      fail: function(data){
        wx.error()
      }
    })
  },
   
})