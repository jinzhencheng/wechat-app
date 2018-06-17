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
        if(!res.data && isFirst){
          isFirst = false
          return
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var { pageIndex } = this.data
    this.bindData(pageIndex)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var { pageIndex } = this.data
    this.bindData(pageIndex)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})