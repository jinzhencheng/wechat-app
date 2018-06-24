var app = getApp()
Page({

  data: {
    info:{},
    selectedDate: "",
    selectedTime: "",
    remarkTip: "备注",
    submitBtnDisabled: false,
    screenHeight: 750 // default screen height defined by Jinzc
  },

  submit: function(event){
    var that = this
    var detail = event.detail.value
    if("" == detail["infoType"]){
      wx.showModal({
        title: '警告',
        content: '请选择发布类型车找人或人找车',
        showCancel: false
      })
      return
    }
    if("" == detail["startPosition"] || "" == detail["endPosition"] || "" == detail["phone"]){
      wx.showModal({
        title: '警告',
        content: '出发地，目的地或电话不允许为空',
        showCancel: false
      })
      return 
    }
    var openId = wx.getStorageSync("openId")
    wx.request({
      url: `${app.globalData.server}/info/add`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data:{
        openId: openId,
        phone: detail["phone"],
        remark: detail["remark"],
        infoType: detail["infoType"],
        startPosition: detail["startPosition"],
        endPosition: detail["endPosition"],
        startTime: `${that.data.selectedDate} ${that.data.selectedTime}`
      },
      success: function(res){
        if(200 == res.statusCode && res.data["id"] > 0){
          that.setData({
            info:{}
          })
          wx.switchTab({
            url: '/pages/index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              console.log(page)
              if (page == undefined || page == null) return;
              page.onShow();
            }  
          })
        }
      },
      fail:function(res){
        console.log(res)
        app.error()
      }
    })
  },

  bindCheck: function(event){
    var that = this
    var value = event.detail.value
    that.setData({
      submitBtnDisabled: (!value.length)
    })
  },

  bindDate: function(event){
    var that = this
    that.setData({
      selectedDate: event.detail.value
    })
  },
  bindTime: function(event){
    var that = this
    that.setData({
      selectedTime: event.detail.value
    })
  },
  bindType: function(event){
    var that = this
    var remark = ""
    if("车找人" == event.detail.value){
      remark = "可乘坐几人，途径地，是否走高速等信息"
    }else if("人找车" == event.detail.value){
      remark = "乘坐人数，是否携带行李等信息"
    }
    that.setData({
      remarkTip: remark
    })
  },
 
  onLoad: function () {
    var that = this
    var system = wx.getStorageSync("system")
    if (system) {
      that.setData({
        screenHeight: system["screenHeight"]
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var currentPath = "/pages/release/edit"
    app.authorize(currentPath)
    var that = this
    var date = new Date()
    var currentDate = `${date.getFullYear()}-${that.zeroFill(date.getMonth() + 1)}-${that.zeroFill(date.getDate())}`
    var currentTime = `${that.zeroFill(date.getHours())}:${that.zeroFill(date.getMinutes())}`
    that.setData({
      selectedDate: currentDate,
      selectedTime: currentTime
    })
  },


  zeroFill:function(i){  
    if(i >= 0 && i <= 9) {
      return "0" + i;
    } else {  
      return i;  
    }
  }  
})