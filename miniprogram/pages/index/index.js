Page({
  data: {
    selected: 0,
    color: "#222222",
    selectedColor: "#37B065",
    listTab: [{
        pagePath: "/pages/event/index",
        text: "事件",
        iconPath: "/images/event.png",
        selectedIconPath: "/images/event-on.png"
      },
      {
        pagePath: "/pages/inspection/index",
        text: "工单",
        iconPath: "/images/xj.png",
        selectedIconPath: "/images/xj-on.png"
      }
    ]
  },

  onLoad: function () {
    // wx.login({
    //   success: (res) => {
    //     console.log("code: " + res.code);
    //     // wx.request({
    //     //   url: 'http://127.0.0.1:3000/login',
    //     //   method: 'POST',
    //     //   data: {
    //     //     code: res.code
    //     //   }
    //     // })
    //   }
    // })
  },

  switchTab(e) {
    const data = e.currentTarget.dataset;
    // const url = data.path;
    this.setData({
      selected: data.index
    })
  }
})