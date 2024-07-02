import {
  putWarnMsg,
  getTimesOtherType,
  getSelfTimes
} from '../../../helpers/index.js'
import {
  requestToken,
  baseHttpUrl
} from '../../../http/request'

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    textName: '',
    allData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let data = JSON.parse(decodeURIComponent(options.baseData))
    wx.setNavigationBarTitle({
      title: data.corporation
    })
    this.setData({
      allData: data
    })
  },

  handleName(e) {
    this.setData({
      textName: e.detail.value
    })
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

  },

  // 提交当前内容
  pullContainer() {
    let that = this

    wx.showModal({
      title: '确认提交?',
      content: '提交后无法再次更改，确认提交吗?',
      success: function (res) {
        if (res.confirm) {
          const addVideoOrImgComponent = that.selectComponent('#addVideoOrImgComponent');
          const imgList = addVideoOrImgComponent.data.imgList;
          let stime = getTimesOtherType(new Date().getTime())

          if (imgList.length == 0) {
            requestToken(`xunjian/nomal_execution`, 'POST', {
              id: that.data.allData.listId,
              event_date_start: stime,
              event_description: that.data.textName,
            }).then(res => {
              wx.navigateBack();
            }).catch(res => {
              putWarnMsg(res.msg)
            })
          } else {
            const uploadTasks = imgList.map((filePath, index) => {
              return new Promise((resolve, reject) => {
                wx.uploadFile({
                  url: baseHttpUrl + 'xunjian/nomal_execution',
                  filePath: filePath,
                  name: 'file',
                  formData: imgList.length == 1 ? {
                    id: that.data.allData.listId,
                    event_date_start: stime,
                    event_description: that.data.textName,
                  } : index == imgList.length - 1 ? {
                    id: that.data.allData.listId,
                    event_date_start: stime,
                    event_description: that.data.textName,
                  } : {
                    id: that.data.allData.listId,
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
  },
})