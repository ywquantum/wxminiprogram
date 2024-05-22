import {
  putWarnMsg,
} from '../../../helpers/index.js'
import {
  requestToken,
  requestToimgs,
  baseHttpUrl
} from '../../../http/request'
const base64 = require('../../../libs/base64');

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageData: null,
    eventDetails: '',
    textEvent: '',
    imgs: []
  },

  // 提交当前内容
  pullContainer() {
    let that = this
    if (this.data.eventDetails == '') {
      putWarnMsg('请填写处理说明')
      return false
    }

    const addVideoOrImgComponent = this.selectComponent('#addVideoOrImgComponent');
    if (addVideoOrImgComponent) {
      const imgList = addVideoOrImgComponent.data.imgList;
      // console.log('子组件的imgList:', imgList);
      // console.log(this.data.eventDetails);
      // console.log(this.data.pageData.eventId);
      wx.showModal({
        title: '确认提交?',
        content: '提交后无法再次更改，确认提交吗?',
        success: function (res) {
          if (res.confirm) {
            if (imgList.length == 0) {
              requestToken(`alarm`, 'POST', {
                alarm_id: that.data.pageData.eventId,
                handle_desc: that.data.eventDetails,
              }).then(res => {
                if (res.code == 0) {
                  wx.navigateBack();
                } else {
                  putWarnMsg(res.msg)
                }
              }).catch(res => {
                putWarnMsg(res.msg)
              })
            } else {
              const uploadTasks = imgList.map((filePath, index) => {
                return new Promise((resolve, reject) => {
                  wx.uploadFile({
                    url: baseHttpUrl + 'alarm',
                    filePath: filePath,
                    name: 'file',
                    formData: imgList.length == 1 ? {
                      alarm_id: that.data.pageData.eventId,
                      handle_desc: that.data.eventDetails,
                    } : index == imgList.length - 1 ? {
                      alarm_id: that.data.pageData.eventId,
                      handle_desc: that.data.eventDetails,
                    } : {
                      alarm_id: that.data.pageData.eventId,
                    },
                    header: {
                      'token': app.globalData.userToken
                    },
                    success: (res) => {
                      resolve(res);
                    },
                    fail: (err) => {
                      reject(err);
                    }
                  });
                });
              });
              Promise.all(uploadTasks)
                .then(results => {
                  wx.navigateBack();
                })
                .catch(error => {});
            }
          } else if (res.cancel) {
            return false
          }
        }
      })
    } 
  },

  handleInput: function (e) {
    this.setData({
      eventDetails: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '处理说明'
    })

    let data = JSON.parse(decodeURIComponent(options.baseData))
    if (data.edit == false) {
      let that = this
      this.setData({
        textEvent: data.handle_desc,
        imgs: []
      })

      let img = data.handle_imgs ? JSON.parse(data.handle_imgs) : []
      img && img.forEach(item => {
        let str = `alarm/handle_file?handle_file=${item}`
        requestToimgs(str, 'get', {}).then(res => {
          const uint8Array = new Uint8Array(res);
          const base64Data = 'data:image/png;base64,' + base64.fromByteArray(uint8Array);
          that.setData({
            imgs: that.data.imgs.concat(base64Data)
          });
        })
      })
    }
    this.setData({
      pageData: data
    })
  },

  backRouter() {
    wx.navigateBack();
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})