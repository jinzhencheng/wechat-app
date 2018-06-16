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
        console.log(res)
        wx.setStorageSync("my_user_id", res.data["id"])
        wx.switchTab({
          url: '/pages/release/edit',
        })
      },
      fail: function(data){
        wx.showModal({
          title: '提示',
          content: '授权失败，请重新打开该系统',
          showCancel: false
        })
      }
    })
  },
   
})