const app = getApp()
var isFirst = true
Page({
  data: {
    infoList: [],
    pageIndex: 0
  },

  bindView: function(){
    console.log('触发了底部滚动事件')
    var { pageIndex } = this.data;
    this.bindData(pageIndex)
  },

  bindData: function(pageIndex){
    var that = this
    wx.request({
      url: `${app.globalData.server}/info/list`,
      method: 'GET',
      data:{
        page_index: pageIndex
      },
      success: function(res){
        var { infoList, pageIndex } = that.data
        if(res.data.length <= 0 && isFirst){
          isFirst = false
          wx.showModal({
            title: '提示',
            content: '已没有更多信息',
            showCancel: false
          })
        }
        res.data.forEach(function(item){
          infoList.push(item)
        })
        that.setData({
          infoList: infoList,
          pageIndex: pageIndex + 1
        })
      },
      fail: function(res){
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
    var { pageIndex } = this.data
    this.bindData(pageIndex)
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