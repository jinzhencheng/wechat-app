
var app = getApp()
var id = null
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
    id = options.id
  },

   onShow: function () {
    var that = this
    that.bindData(id)
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