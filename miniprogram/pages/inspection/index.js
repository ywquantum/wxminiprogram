import {
  requestToken
} from '../../http/request'
import {
  getTimesOtherType,
  putWarnMsg,
  getTimesOtherType_one
} from '../../helpers/index'

const app = getApp();

Component({
  behaviors: [],
  // 属性定义（详情参见下文）
  properties: {},
  data: {
    menulist: ['待开始', '已结束', '工单列表'],
    menuTopVal: 0,
    containerMenuList: 0,
    waitEvent: [],
    doneEvent: [{
        corporation: '检查污水池的液位是否正常',
        Instructions: '1',
        status: false
      },
      {
        corporation: '检查污水池的液位是否正常',
        Instructions: '2',
        status: true
      },
      {
        corporation: '检查污水池的液位是否正常',
        Instructions: '3',
        status: true
      },
    ],
    workorderData: [],
    selectpeopleArr: null,
  },

  lifetimes: {
    attached: function () {
      wx.setNavigationBarTitle({
        title: '工单中心'
      })

      this.getPortData();
      this.getDKSdatas();
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
    getPortData() {
      let that = this;
      requestToken('xunjian/get_inspection_list', 'get', {}).then(res => {
        if (res.code == 0) {
          that.setData({
            selectpeopleArr: res.data.departments,
          })
        } else {
          putWarnMsg(res.msg)
        }
      }).catch(res => {
        putWarnMsg(res.msg)
      })
    },
    getDKSdatas() {
      let that = this;

      let str = `xunjian/inspection_get?executor_id=${app.globalData.userId}&event_department=&event_type=&event_status=1&page=1`
      requestToken(str, 'get', {}).then(res => {
        if (res.code == 0) {
          let arr = [];
          res.data.inspections.forEach(item => {
            arr.push({
              corporation: item.event_name,
              Instructions: item.event_description,
              time: getTimesOtherType(item.event_date_start),
              endtime: getTimesOtherType(item.event_date_end),
              imgs: [],
              type: item.event_type == 2 ? "workorder" : "inspection",
              id: item.event_id,
            })
          })
          that.setData({
            waitEvent: arr
          })
        } else {
          putWarnMsg(res.msg)
        }
      }).catch(res => {
        putWarnMsg(res.msg)
      })
    },
    getGDlist() {
      let that = this;

      let str = `xunjian/inspection_list_get?event_type=&page=1&event_department=&creator_id=${app.globalData.userId}&event_overview=1`
      requestToken(str, 'get', {}).then(res => {
        if (res.code == 0) {
          console.log(res);
          let arr = [];
          res.data.inspections.forEach(item => {
            let startTime = getTimesOtherType_one(item.event_date_start);
            let endTime = getTimesOtherType_one(item.event_date_end);
            let stime = [];
            if (item.event_type == 2) {
              stime.push(['', endTime])
            } else {
              let str = item.event_time_gap.split(',');
              str.forEach(dev => {
                if (dev != '') {
                  let sr = dev.split('-');
                  stime.push([sr[0], sr[1]])
                }
              })
            };
            let userPart, userName;
            for (let k in that.data.selectpeopleArr) {
              that.data.selectpeopleArr[k].forEach((dev) => {
                if (dev.id == item.executor_id) {
                  userPart = k;
                  userName = dev.name;
                }
              });
            }
            let humanbeing = [userPart, item.user_position, userName];
            let userStatus = item.event_status == '1' ? '待开始' : item.event_status == '2' ? '进行中' : item.event_status == '3' ? '未完成' : item.event_status == '4' ? '已完成' : '请假'

            arr.push({
              type: item.event_type == 2 ? "普通工单" : "巡检工单",
              corporation: item.event_name,
              Instructions: item.event_description,
              imgs: [],
              taskcycle: [startTime, endTime],
              repeat: item.event_frequency,
              starttime: stime,
              people: humanbeing,
              status: userStatus,
              department: item.event_department,
              id: item.event_id,
            })
          })
          that.setData({
            workorderData: arr
          })
        } else {
          putWarnMsg(res.msg)
        }
      }).catch(res => {
        putWarnMsg(res.msg)
      })
    },
    menuFun(e) {
      let val = e.detail;

      this.setData({
        containerMenuList: val
      })
      if (val == 0) {
        this.getDKSdatas()
      } else if (val == 1) {

      } else if (val == 2) {
        this.getGDlist()
      }
    },
    akyleaveFun() {
      wx.navigateTo({
        url: '../askLeave/askLeave'
      })
    },
    addWorkFun() {
      wx.navigateTo({
        url: '../../inspectionpage/pages/workEditing/workEditing'
      })
    },
    startInspection(e) {
      let baseData = JSON.stringify(e.currentTarget.dataset['index'])
      wx.navigateTo({
        url: '../../inspectionpage/pages/inspectionDetails/inspectionDetails?baseData=' + encodeURIComponent(baseData)
      })
    },
    startWorkorder(e) {
      let baseData = JSON.stringify(e.currentTarget.dataset['index'])
      wx.navigateTo({
        url: '../../inspectionpage/pages/workOrderDetails/workOrderDetails?baseData=' + encodeURIComponent(baseData)
      })
    },
    endWorkLook(e) {
      let baseData = JSON.stringify(e.currentTarget.dataset['index'])
      wx.navigateTo({
        url: '../../inspectionpage/pages/isoverDetails/isoverDetails?baseData=' + encodeURIComponent(baseData)
      })
    },
    workOrderFun(e) {
      let baseData = JSON.stringify(e.currentTarget.dataset['index'])
      wx.navigateTo({
        url: '../../inspectionpage/pages/workEditing/workEditing?baseData=' + encodeURIComponent(baseData)
      })
    }
  }
})