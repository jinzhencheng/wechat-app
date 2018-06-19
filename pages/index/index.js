const app = getApp()
Page({
  data: {
    infoList: [],
    pageIndex: 0,
    hasData: true
  },

  showDetail: function(event){
    var id = event.currentTarget["id"]
    wx.navigateTo({
      url: `/pages/info/detail?id=${id}`
    })
  },

  bindView: function(){
    console.log('触发了底部滚动事件')
    var { pageIndex } = this.data;
    this.bindData(pageIndex)
  },

  bindData: function(pageIndex){
    var that = this
    if(!that.data.hasData){
      return
    }
    wx.request({
      url: `${app.globalData.server}/info/list`,
      method: 'GET',
      data:{
        pageIndex: pageIndex
      },
      success: function(res){
        var { infoList, pageIndex } = that.data
        if (res.data.length <= 0){
          that.setData({
            hasData: false
          })
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
        wx.fail()
      }
    })
  },

 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var { pageIndex } = this.data
    this.bindData(pageIndex)
  },

  onShow: function(){
    var { pageIndex } = this.data
    this.bindData(pageIndex)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var path = "/pages/index/index"
    app.share(path)
  }
})