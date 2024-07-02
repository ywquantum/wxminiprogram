// pages/askLeave/askLeave.js
import {
  putWarnMsg,
  getTimestampConversion,
  getSelfTimes
} from '../../helpers/index.js'
import {
  requestToken,
} from '../../http/request'

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // mode: 'dateTime',
    mode: 'date',
    startTime: new Date(getTimestampConversion(new Date().getTime())).getTime(),
    endTime: new Date(getTimestampConversion(new Date().getTime())).getTime(),
    textName: ''
  },

  // 提交当前内容
  pullContainer() {
    let stime = getSelfTimes(this.data.startTime)
    let etime = getSelfTimes(this.data.endTime)
    let that = this
    wx.showModal({
      title: '确认请假？',
      content: '是否确认提交本次请假记录？',
      success: function (res) {
        if (res.confirm) {
          requestToken(`xunjian/event_leave`, 'PUT', {
            event_description: that.data.textName,
            event_date_start: stime,
            event_date_end: etime,
            executor_id: app.globalData.userId,
          }).then(res => {
            wx.navigateBack();
          }).catch(res => {
            putWarnMsg(res.msg)
          })
        }
      }
    })
  },

  ptEnd(e) {
    this.setData({
      endTime: new Date(e.detail.value).getTime()
    })
  },

  ptStart(e) {
    this.setData({
      startTime: new Date(e.detail.value).getTime()
    })
  },

  handleName(e) {
    this.setData({
      textName: e.detail.value
    })
  },

  //返回回调函数
  onPickerChange(e) {
    console.log("onPickerChange", e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '请假'
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

  }
})