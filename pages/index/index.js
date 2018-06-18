const app = getApp()
var hasData = true
Page({
  data: {
    infoList: [],
    pageIndex: 0
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
    wx.request({
      url: `${app.globalData.server}/info/list`,
      method: 'GET',
      data:{
        page_index: pageIndex
      },
      success: function(res){
        var { infoList, pageIndex } = that.data
        if (!res.data && hasData){
          hasData = false
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

  onShow: function(){
    // TODO: 待处理
    /*
    wx.showToast({
      title: "加载失败",
      image: "/images/app/fail.png"
    })
    */
    
    /*
    wx.showLoading({
      title: "有新消息",
      success:function(res){

      },
      fail:function(res){
        wx.showToast({
          title: "加载最新消息时失败",
          image: "/images/app/fail.png"
        })
      }
    })
    */
    //wx.hideLoading()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var path = "/pages/index/index"
    app.share(path)
  }
})