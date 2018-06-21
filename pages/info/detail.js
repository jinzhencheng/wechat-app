
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
    if(that.data.info.overdue){
      wx.showToast({
        title: '信息已过期',
        image: "/images/app/warning.png"
      })
      return
    }
    var phone = that.data.info.phone
    wx.makePhoneCall({
      phoneNumber: phone      
    })
  },

  bindData: function(){
    var that = this
    app.loading()
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
      },
      complete: function(){
        wx.hideToast()
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