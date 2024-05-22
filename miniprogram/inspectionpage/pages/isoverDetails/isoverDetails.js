import {
  requestToimgs
} from '../../../http/request'
const base64 = require('../../../libs/base64');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    instructions: '',
    imgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let data = JSON.parse(decodeURIComponent(options.baseData))
    this.setData({
      instructions: data.Instructions,
      imgs: []
    })
    wx.setNavigationBarTitle({
      title: data.corporation
    })
    let that = this
    let img = data.imgs ? data.imgs : []
    img && img.forEach(item => {
      let str = `xunjian/ins_handle_file?handle_file=${item}`
      requestToimgs(str, 'get', {}).then(res => {
        const uint8Array = new Uint8Array(res);
        const base64Data = 'data:image/png;base64,' + base64.fromByteArray(uint8Array);
        that.setData({
          imgs: that.data.imgs.concat(base64Data)
        });
      })
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

})