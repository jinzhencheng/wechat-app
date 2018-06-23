var app = getApp()
var defaultPrePath = "/pages/index/index"
var redirectPath = defaultPrePath
Page({

  data:{},

  onLoad: function(options){
    var that = this
    var prePath = options["prePath"]
    if(prePath){
      redirectPath = prePath
    }
  },

  requestUser: function(requestData){
    app.loading()
    wx.request({
      url: `${app.globalData.server}/user/add`,
      data: {
        code: requestData.code,
        encryptedData: requestData.encryptedData,
        iv: requestData.iv
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log("执行授权操作，返回:res", res)
        if(200 === res.statusCode){
          app.success()
          wx.setStorageSync("openId", res.data["open_id"])
          wx.switchTab({
            url: redirectPath
          })
        }else{
          app.error()
        }
        
      },
      fail: function (res) {
        app.error()
      },
      complete: function () {
        wx.hideToast()
      }
    })
  },

  getUserInfo:function(res){
    var that = this
    if(res.detail["errMsg"].search("fail") != -1){
      app.fail()
      return 
    }
    var detail = res.detail
    wx.setStorageSync("userInfo", detail["userInfo"])
    wx.login({
      success: function (res) {
        console.log("登录成功后返回res:", res)
        wx.setStorageSync("code", res.code)
        var requestData = {
          code: res.code, 
          encryptedData: detail["encryptedData"],
          iv: detail["iv"]
          }
        that.requestUser(requestData)
      }
    })
  },
   
})