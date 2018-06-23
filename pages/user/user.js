const app = getApp()
Page({

  data: {
    user: null,
    screenHeight: 750 //default screen height defined by Jinzc
  },

  showRelease: function(){
    wx.navigateTo({
      url: "/pages/my/release",
    })
  },

  onLoad: function () {
    var that = this
    var system = wx.getStorageSync("system")
    if (system) {
      that.setData({
        screenHeight: system["screenHeight"]
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var currentPath = "/pages/user/user"
    app.authorize(currentPath)
    var that = this
    var userInfo = wx.getStorageSync("userInfo")
    that.setData({
      user: userInfo
    })
  },

})