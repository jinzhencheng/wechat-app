// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null
  },

  showRealse: function(){
    wx.navigateTo({
      url: "/pages/my/release",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          var userInfo = wx.getStorageSync("userInfo")
          if(!userInfo){
            wx.getUserInfo({
              success: function(res){
                wx.setStorageSync("userInfo", res.detail["userInfo"])
              },
              fail: function(){
                app.error()
              }
            })
          }
        } else {
          wx.navigateTo({
            url: '/pages/authorization/authorize',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var userInfo = wx.getStorageSync("userInfo")
    that.setData({
      user: userInfo
    })
    console.log(userInfo)
  },

})