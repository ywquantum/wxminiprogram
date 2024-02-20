Component({
  behaviors: [],
  // 属性定义（详情参见下文）
  properties: {},
  data: {
    menulist: ['待处理', '已处理'],
    menuTopVal: 0,
    containerMenuList: 0,
    waitEvent: [{
        corporation: `丰乐-变压器-A相`,
        time: '2023.6.5 10:33',
        type: '变压器温度报警',
        position: `2#配电房`,
        Instructions: `「丰乐」变压器「A」相温度超过报警阈值（温度报警阈值》=100°，当前温度105°）`,
        charger: `黄金城/18326107278`,
        status: true,
      },
      {
        corporation: `废水排口（重金属）`,
        time: '2023.6.5 10:33',
        type: '排口排放超标报警',
        position: `2#配电房`,
        Instructions: `「丰乐」变压器「A」相温度超过报警阈值（温度报警阈值》=100°，当前温度105°）`,
        charger: `黄金城/18326107278`,
        status: false,
      },
      {
        corporation: `废水排口（重金属）`,
        time: '2023.6.5 10:33',
        type: '排口排放超标报警',
        position: `2#配电房`,
        Instructions: `「丰乐」变压器「A」相温度超过报警阈值（温度报警阈值》=100°，当前温度105°）`,
        charger: `黄金城/18326107278`,
        status: false,
      },
      {
        corporation: `废水排口（重金属）`,
        time: '2023.6.5 10:33',
        type: '排口排放超标报警',
        position: `2#配电房`,
        Instructions: `「丰乐」变压器「A」相温度超过报警阈值（温度报警阈值》=100°，当前温度105°）`,
        charger: `黄金城/18326107278`,
        status: false,
      },
    ],
    doneEvent: [{
        corporation: `A3-2-1`,
        time: '2023.6.5 10:33',
        type: '废气塔未开启报警',
        position: `2#配电房`,
        Instructions: `「丰乐」变压器「A」相温度超过报警阈值（温度报警阈值》=100°，当前温度105°）`,
        charger: `杨振敏/18326107278`,
      },
      {
        corporation: `A3-2-1`,
        time: '2023.6.5 10:33',
        type: '废气塔排放不达标报警',
        position: `2#配电房`,
        Instructions: `「丰乐」变压器「A」相温度超过报警阈值（温度报警阈值》=100°，当前温度105°）`,
        charger: `黄金城/18326107278`,
      },
    ]
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      wx.setNavigationBarTitle({
        title: '事件'
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
    eventSwitch(e) {
      let baseData = JSON.stringify(e.currentTarget.dataset['index'])
      wx.navigateTo({
        url: '../../eventpage/pages/eventDetails/eventDetails?baseData=' + encodeURIComponent(baseData)
      })
    }
  }
})