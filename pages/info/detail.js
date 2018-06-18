
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    id: null
  },

  makeCall: function(){
    var that = this
    var phone = that.data.info.phone
    wx.makePhoneCall({
      phoneNumber: phone      
    })
  },

  bindData: function(){
    var that = this
    wx.request({
      url: `${app.globalData.server}/info/get`,
      data: {
        id: that.data.id
      },
      success: function (res) {
        that.setData({
          info: res.data
        })
      },
      fail: function (res) {
        app.error()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
    })
    wx.getSetting({
      success: function(res){
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/authorization/authorize',
          })
        }
      },
      fail: function(res){
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.bindData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this
    var path = `/pages/info/detail?id=${that.data.id}`
    app.share(path)
  }
})