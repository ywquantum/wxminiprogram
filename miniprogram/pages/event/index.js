import {
  requestToken
} from '../../http/request'
import {
  putWarnMsg,
  getTimesOtherType_one,
  getTimestampConversion,
  getSandM,
} from '../../helpers/index.js'

const app = getApp();

Component({
  behaviors: [],
  // 属性定义（详情参见下文）
  properties: {},
  data: {
    menulist: ['待处理', '已处理'],
    menuTopVal: 0,
    containerMenuList: 0,
    waitEvent: [],
    doneEvent: []
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      wx.setNavigationBarTitle({
        title: '事件'
      })

      this.getTableList(1)
    },
    moved: function () {},
    detached: function () {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {},
    hide: function () {},
    resize: function () {},
  },

  methods: {
    menuFun(e) {
      let val = e.detail;
      this.setData({
        containerMenuList: val
      })
      this.getTableList(val == 0 ? 1 : 2)
    },
    eventSwitch(e) {
      let baseData = JSON.stringify(e.currentTarget.dataset['index'])
      wx.navigateTo({
        url: '../../eventpage/pages/eventDetails/eventDetails?baseData=' + encodeURIComponent(baseData)
      })
    },
    getTableList(type) {
      let that = this;
      requestToken(`alarm?status=${type}&order=1&page=0`, 'get', {}).then(res => {
        // console.log(res);
        if (res.code == 0) {
          if (type == 1) {
            let arr = [];
            res.data.alarms.forEach(item => {
              let name;
              res.data.qiye_users.forEach((dev) => {
                if (dev.id == item.direct_id) {
                  name = dev.name;
                }
              });
              arr.push({
                corporation: item.alarm_name,
                time: getTimestampConversion(item.data_time),
                type: item.alarm_name,
                position: item.dw,
                Instructions: item.alarm_desc,
                charger: name,
                eventId: item.id,
                edit: true,
              })
            })
            that.setData({
              waitEvent: arr
            })
          } else if (type == 2) {
            let arr = [];
            res.data.alarms.forEach(item => {
              let name;
              res.data.qiye_users.forEach((dev) => {
                if (dev.id == item.direct_id) {
                  name = dev.name;
                }
              });
              arr.push({
                corporation: item.alarm_name,
                time: getTimestampConversion(item.data_time),
                type: item.alarm_name,
                position: item.dw,
                Instructions: item.alarm_desc,
                charger: name,
                eventId: item.id,
                edit: false,
              })
            })
            that.setData({
              doneEvent: arr
            })
          }
        } else {
          putWarnMsg(res.msg)
        }
      }).catch(res => {
        putWarnMsg(res.msg)
      })
    }
  }
})