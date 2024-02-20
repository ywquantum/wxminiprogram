Component({
  properties: {
    text: {
      type: String,
      value: ''
    },
    expandText: {
      type: String,
      value: '展开'
    },
    collapseText: {
      type: String,
      value: '收起'
    }
  },
  data: {
    isExpand: false
  },
  methods: {
    onClick() {
      this.setData({
        isExpand: !this.data.isExpand
      })
    }
  },
  lifetimes: {
    attached: function () {
      // const query = wx.createSelectorQuery();
      // console.log(query.select('.text-expansion__text'));
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})