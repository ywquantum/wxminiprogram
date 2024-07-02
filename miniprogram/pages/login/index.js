import {
  request,
  requestToken
} from '../../http/request'
import {
  getTimesOtherType,
} from '../../helpers/index'

const app = getApp();

Page({
  data: {
    openid: "",
    loginstate: "0",
    userEntity: null,
    terminal: "",
    osVersion: "",
    logoingType: true,
    phoneNumbers: '',
    passwordInput: '',
  },
  onLoad: function () {
    var that = this;

    const promise1 = new Promise((resolve, reject) => {
      wx.getStorage({
        key: 'userPhone',
        success: function (res) {
          resolve(res.data);
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
    const promise2 = new Promise((resolve, reject) => {
      wx.getStorage({
        key: 'userPassword',
        success: function (res) {
          resolve(res.data);
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
    Promise.all([promise1, promise2])
      .then(([data1, data2]) => {
        that.loginFun(data1, data2)
      })
      .catch(err => {});
  },
  inputChange: function (event) {
    this.setData({
      passwordInput: event.detail.value
    });
  },
  buttonClicked: function () {
    if (this.data.passwordInput == '') {
      wx.showToast({
        title: '请输入登录密码',
        icon: 'none',
        duration: 1500
      });
    }

    this.loginFun(this.data.phoneNumbers, this.data.passwordInput)
  },
  loginFun: function (phone, password) {
    request('login', 'post', {
      phone: phone,
      password: password
      // phone: '17891911990',
      // password: 'abcd1234'
      // phone: '18621109358',
      // password: '123456789a'
    }).then(res => {
      if (res.data.code != 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        });
      } else {
        wx.setStorage({
          key: "userPhone",
          data: phone
        })
        wx.setStorage({
          key: "userPassword",
          data: password
        })

        app.globalData.userToken = res.data.data.token
        app.globalData.userId = res.data.data.id

        // wx.setStorage({
        //   key: "userToken",
        //   data: res.data.data.token
        // })
        // wx.setStorage({
        //   key: "userId",
        //   data: res.data.data.id
        // })

        console.log('登录成功');
        requestToken(`xunjian/event_stauts?executor_id=${res.data.data.id}`, 'GET', {}).then(res => {
          if (res.data.length == 0) {
            wx.reLaunch({
              url: '../index/index'
            })
          } else {
            let arr = {
              corporation: res.data[0].event_name,
              Instructions: res.data[0].event_description,
              time: getTimesOtherType(res.data[0].event_date_start),
              endtime: res.data[0].event_date_end && getTimesOtherType(res.data[0].event_date_end),
              imgs: res.data[0].event_pic && JSON.parse(res.data[0].event_pic),
              type: res.data[0].event_type == 2 ? "workorder" : "inspection",
              id: res.data[0].event_id,
              imgCoolapse: 0,
              listId: res.data[0].id,
              originStatus: true
            }
            let baseData = JSON.stringify(arr)
            wx.reLaunch({
              url: '../../inspectionpage/pages/inspectionDetails/inspectionDetails?baseData=' + encodeURIComponent(baseData)
            })
          }
        })



      }
    }).catch(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      });
    })
  },
  getPhoneNumber: function (e) {
    var that = this;

    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success: (res) => {
          request('wx/get_info', 'post', {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: res.code
          }).then(res => {
            // console.log(res);
            that.setData({
              phoneNumbers: res.data.data.phone
            })
            that.setData({
              logoingType: false
            });
          }).catch(res => {
            console.log(res);
          })
        },
      })
    }
  },
})