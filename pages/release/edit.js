var app = getApp()
Page({

  data: {
    selectedDate: "",
    selectedTime: "",
    remarkTip: "备注",
    submitBtnDisabled: false
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
    var openId = app.openId()
    console.log("openId:", openId)
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
        if(res && res.data["id"] > 0){
          wx.switchTab({
            url: '/pages/index/index',
            success: function (res) {
              var page = getCurrentPages().pop()
              if (page == undefined || page == null){
                return
              }
              page.reload()
            } 
          })
        }
      },
      fail:function(res){
        app.erro()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: function(res){
        if (!res.authSetting['scope.userInfo']){
          wx.navigateTo({
            url: '/pages/authorization/authorize',
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