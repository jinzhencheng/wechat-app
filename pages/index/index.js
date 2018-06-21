const app = getApp()
var initPageIndex = 0
Page({
  data: {
    infoList: [],
    pageIndex: initPageIndex,
    hasData: true,
    screenHeight: 650 // default screen height defined by Jinzc
  },

  showDetail: function(event){
    var id = event.currentTarget["id"]
    wx.navigateTo({
      url: `/pages/info/detail?id=${id}`
    })
  },

  bindView: function(){
    var { pageIndex } = this.data;
    this.bindData(pageIndex + 1)
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
        var { infoList } = that.data
        if (!res.data || res.data.length <= 0){
          that.setData({
            hasData: false
          })
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
        app.fail(res)
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
    var { pageIndex } = this.data
    this.bindData(initPageIndex)
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },2000)
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