const app = getApp()
var initPageIndex = 0
var pageIndex = initPageIndex
var hasData = true

Page({

  data: {
    infoList: [],
    screenHeight: 750 // default screen height defined by Jinzc
  },

  showDetail: function(event){
    var id = event.currentTarget["id"]
    wx.navigateTo({
      url: `/pages/info/detail?id=${id}`
    })
  },

  bindView: function(){
    this.bindData(pageIndex + 1)
  },

  bindData: function(pageIndex){
    var that = this
    if(!hasData && initPageIndex != pageIndex){
      return
    }
    app.loading()
    wx.request({
      url: `${app.globalData.server}/info/list`,
      method: 'GET',
      data:{
        pageIndex: pageIndex
      },
      success: function(res){
        var { infoList } = that.data
        if (!res.data || res.data.length <= 0 || (res.data.length < 10 && pageIndex != initPageIndex)){
          hasData = false
          return
         }
        if(0 === pageIndex){
          infoList = []
        }
        res.data.forEach(function(item){
          infoList.push(item)
        })
        that.setData({
          infoList: infoList
        })
      },
      fail: function(res){
        app.fail()
      },
      complete: function(){
        wx.hideToast()
      }
    })
  },

  onLoad: function(){
    var that = this
    var system = wx.getStorageSync("system")
    if(system){
      that.setData({
        screenHeight: system["screenHeight"]
      })
    }
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.bindData(initPageIndex)
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },2000)
  },

  onShow: function(){
    this.bindData(initPageIndex)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var path = "/pages/index/index"
    app.share(path)
  }
})