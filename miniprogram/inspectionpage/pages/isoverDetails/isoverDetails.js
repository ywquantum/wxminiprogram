import {
  requestToimgs,
  requestToken
} from '../../../http/request'
import {
  getTimesOtherType
} from '../../../helpers/index'
const base64 = require('../../../libs/base64');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    instructions: '',
    allDatas: {},
    imgs: [],
    workTypes: true,
    realTimes: [],
    record_details: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let data = JSON.parse(decodeURIComponent(options.baseData))
    console.log(data);
    if (data.event_type == '1') {
      this.setData({
        workTypes: true,
      })
      // requestToken(`xunjian/history_get?id=46`, 'get', {}).then(res => {
      requestToken(`xunjian/history_get?id=${data.id}`, 'get', {}).then(res => {
        console.log(res);

        let start = res.data.main_record.event_date_start && getTimesOtherType(res.data.main_record.event_date_start);
        let end = res.data.main_record.event_end_actual && getTimesOtherType(res.data.main_record.event_end_actual);

        that.setData({
          realTimes: [start, end],
          record_details: [],
        })

        let indexs = 0;
        let dataFun = (index) => {
          if (index >= res.data.record_details.length) return false;
          let item = res.data.record_details[index];

          let img = JSON.parse(item.event_pic);
          let picImg = []
          let promises = img.map(dev => {
            let str = `xunjian/ins_handle_file?handle_file=${dev}`;
            return requestToimgs(str, 'get', {}).then(res => {
              const uint8Array = new Uint8Array(res);
              const base64Data = 'data:image/png;base64,' + base64.fromByteArray(uint8Array);
              picImg.push(base64Data);
            });
          });

          Promise.all(promises).then(() => {
            that.setData({
              record_details: that.data.record_details.concat({
                imgs: picImg,
                exception_description: item.exception_description
              })
            })
            dataFun(index + 1);
          })
        }
        if (res.data.record_details.length > 0) {
          dataFun(indexs)
        }

        requestToken(`xunjian/insert_inspection_track`, 'get', {}).then(src => {})
      })
    } else {
      this.setData({
        workTypes: false,
      })
    }

    this.setData({
      imgs: [],
      instructions: data.Instructions,
      allDatas: data
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