Component({
  behaviors: [],
  // 属性定义（详情参见下文）
  properties: {},
  data: {
    menulist: ['待开始', '已结束', '工单列表'],
    menuTopVal: 0,
    containerMenuList: 0,
    waitEvent: [{
        corporation: '检查污水池的液位是否正常',
        Instructions: '经排查，污水池设备正常运行，暂无发现问题。液位正常，并未超过危险值。',
        time: '2023.6.5 10:33',
        endtime: '2023.6.5 10:33',
        imgs: ['', '', ''],
        status: true,
        type: 'inspection',
      },
      {
        corporation: '巡检任务名称',
        Instructions: '巡检任务说明',
        time: '2023.6.5 10:33',
        status: false,
        type: 'inspection',
      },
      {
        corporation: '普通工单名称',
        Instructions: '普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明普通工单内容说明',
        time: '2023.6.5 10:33',
        type: 'workorder'
      },
    ],
    doneEvent: [{
        corporation: '检查污水池的液位是否正常',
        Instructions: '检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常',
        status: false
      },
      {
        corporation: '检查污水池的液位是否正常',
        Instructions: '检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常',
        status: true
      },
      {
        corporation: '检查污水池的液位是否正常',
        Instructions: '检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常检查污水池的液位是否正常',
        status: true
      },
    ],
    workorderData: [{
        type: '巡检工单',
        corporation: '巡检工单名称',
        Instructions: '巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行巡检工单是否正常在运行',
        imgs: ['', '', ''],
        taskcycle: ['2023.10.19 8:00', '2024.11.19 8:00'],
        repeat: '不重复',
        starttime: [
          ['2023.10.19 8:00', '2023.10.19 9:00']
        ],
        people: ['安全部', '安全员', '张三'],
        status: '未结束'
      },
      {
        type: '普通工单',
        corporation: '普通工单名称',
        Instructions: '普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容普通工单名称内容',
        imgs: ['', '', ''],
        starttime: [
          ['2023.10.19 8:00', '2023.10.19 9:00']
        ],
        people: ['安全部', '安全员', '张三'],
        status: '未结束'
      }
    ]
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      wx.setNavigationBarTitle({
        title: '工单中心'
      })
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