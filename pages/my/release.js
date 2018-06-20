const app = getApp()
var initPageIndex = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: [],
    pageIndex: initPageIndex,
    hasData: true,
    screenHeight: 750 //default screen height defined by Jinzc
  },

  bindData: function(pageIndex){
    var that = this
    var openId = app.openId()
    if(!that.data.hasData){
      return
    }
    wx.request({
      url: `${app.globalData.server}/info/list_by_user`,
      data: {
        openId: openId,
        pageIndex: pageIndex
      },
      success: function (res) {
        var { infoList } = that.data
        if (res.data.length <= 0) {
          that.setData({
            hasData: false
          })
          return
        }
        if(0 === pageIndex){
          infoList = []
        }
        res.data.forEach(function (item) {
          infoList.push(item)
        })
        that.setData({
          infoList: infoList
        })
      },
      fail: function () {
        app.fail()
      }
    })
  },

  deleteInfo: function(event){
    console.log(event)
    var that = this
    var confirm = false
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success:function(options){
        if(options.confirm){
          wx.request({
            url: `${app.globalData.server}/info/delete`,
            data: {
              id: event.currentTarget["id"]
            },
            success: function (res) {
              if ("success" == res.data["status"]) {
                app.success()
                var initPageIndex = 0
                that.bindData(initPageIndex)
              } else {
                app.fail()
              }
            },
            fail: function () {
              app.error()
            }
          })
        }
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.authorize()
    var that = this
    var { pageIndex } = that.data
    that.bindData(pageIndex)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    var { pageIndex } = that.data
    that.bindData(initPageIndex)
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  },

})