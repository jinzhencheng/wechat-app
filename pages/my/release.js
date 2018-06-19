const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: [],
    pageIndex: 0,
    hasData: true
  },

  bindData: function(pageIndex){
    console.log("page index: ", pageIndex)
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    that.bindData(pageIndex + 1)
  },

})