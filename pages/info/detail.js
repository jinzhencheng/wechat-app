
var app = getApp()
Page({

  data: {
    info: null
  },

  makeCall: function(){
    var that = this
    var phone = that.data.info.phone
    wx.makePhoneCall({
      phoneNumber: phone      
    })
  },

  bindData: function(id){
    var that = this
    app.loading()
    wx.request({
      url: `${app.globalData.server}/info/get`,
      data: {
        id: id
      },
      success: function (res) {
        that.setData({
          info: res.data
        })
      },
      fail: function (res) {
        app.error()
      },
      complete: function(){
        wx.hideToast()
      }
    })
  },

  onLoad: function (options) {
    var id = options.id
    wx.setStorageSync("id", id)
  },

   onShow: function () {
    var that = this
    var id = wx.getStorageSync("id")
    that.bindData(id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var id = wx.getStorageSync("id")
    var path = `/pages/info/detail?id=${id}`
    app.share(path)
  }
})