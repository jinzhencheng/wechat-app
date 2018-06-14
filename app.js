//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    login: () => {
      wx.login({
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        success: res => {
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              console.log(res)
              wx.request({
                url: `http://${this.globalData.host}:${this.globalData.port}/user/login`,
                data: {
                  code: res.code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: res => {
                  console.log('请求后台成功')
                  console.log(res)
                },
                fail: res => {
                  console.log('请求后台失败')
                  console.log(res)
                }
              })
            }
          })
        },
        fail: res => {
          console.log('fail')
          console.log(res)
        }
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          /*
          console.log('用户未授权')
          if(wx.openSetting){
            wx.openSetting({
              success: res => {
                this.login()
              },
              fail: res => {
                wx.showModal({
                  title: '授权提示',
                  content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
                })
              }
            })
          }else{
            wx.showModal({
              title: '授权提示',
              content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
            })
          }
          */
          
        }
      },
      fail: res => {
        console.log('getSetting failure')
        console.log(res)
      }
    })
    

    // 登录
    /*
    
    */

   
  },
  globalData: {
    userInfo: null,
    server: 'http://127.0.0.1:5000'
  }
})