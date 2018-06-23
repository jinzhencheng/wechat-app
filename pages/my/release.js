const app = getApp()
var initPageIndex = 0
var pageIndex = initPageIndex
var hasData = true
Page({

  data: {
    infoList: [],
    screenHeight: 750 //default screen height defined by Jinzc
  },

  bindData: function(pageIndex){
    var that = this
    if(!hasData && initPageIndex != pageIndex){
      return
    }
    var openId = wx.getStorageSync("openId")
    console.log("我的发布，获取openId:", openId)
    app.loading()
    wx.request({
      url: `${app.globalData.server}/info/list_by_user`,
      data: {
        openId: openId,
        pageIndex: pageIndex
      },
      success: function (res) {
        var { infoList } = that.data
        if (!res.data || res.data.length <= 0 || (res.data.length < 10 && pageIndex != initPageIndex)) {
          hasData = false
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
      },
      complete: function(){
        wx.hideToast()
      }
    })
  },

  deleteInfo: function(event){
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

  onShow: function () {
    var that = this
    that.bindData(initPageIndex)
  },

  bindView: function () {
    this.bindData(pageIndex + 1)
  },

})