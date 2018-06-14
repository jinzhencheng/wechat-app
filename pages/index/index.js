const app = getApp()
Page({
  data: {
    infoList: [],
    entity: null
  },

  init: () => {
    var that = this
    wx.request({
      url: `${app.globalData.server}/info/list`,
      method: 'GET',
      success: res => {
        that.setData({
          "infoList": res.data,
          "entity": res.data[0]
        })
      },
      fail: res => {
        console.log(res)
        console.log('initliza data error')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.init()
    console.log(this.data.infoList)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})