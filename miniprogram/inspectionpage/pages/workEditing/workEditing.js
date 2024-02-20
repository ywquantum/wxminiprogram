// inspectionpage/pages/workEditing/workEditing.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageStatus: true,
    mode: 'dateTime',
    timeForstart: new Date().getTime(),
    timeForstartTwo: new Date().getTime(),
    questForstart: new Date().getTime(),
    questForstartTwo: new Date().getTime(),

    textName: '',
    textContainer: '',

    addNewDateList: [{
      timeStart: new Date().getTime(),
      endStart: new Date().getTime()
    }],
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
    weekRepeat: [{
        val: '周一',
        click: false
      },
      {
        val: '周二',
        click: false
      },
      {
        val: '周三',
        click: false
      },
      {
        val: '周四',
        click: false
      },
      {
        val: '周五',
        click: false
      },
      {
        val: '周六',
        click: false
      },
      {
        val: '周天',
        click: false
      },
    ],
    repeatDate: '不重复',

    partits: [{
        name: "安全部",
        id: "安全部"
      },
      {
        name: "生产部",
        id: "生产部"
      },
    ],
    partId: '安全部',
    workTypeits: [{
        name: "普通工单",
        id: "普通工单"
      },
      {
        name: "巡检工单",
        id: "巡检工单"
      },
    ],
    workTypeId: '普通工单',
    workBaseType: true,

    btmPartId: '安全部',
    btmPartits: [{
        name: "安全部",
        id: "安全部"
      },
      {
        name: "生产部",
        id: "生产部"
      },
    ],
    btmWZId: '安全员',
    btmWZits: [{
        name: "安全员",
        id: "安全员"
      },
      {
        name: "负责人",
        id: "负责人"
      },
    ],
    btmPeopleId: '张三',
    btmPeopleits: [{
        name: "张三",
        id: "张三"
      },
      {
        name: "李四",
        id: "李四"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.baseData) {
      let data = JSON.parse(decodeURIComponent(options.baseData))
      this.setData({
        pageStatus: false,
        workTypeId: data.type,
        workBaseType: data.type == '普通工单' ? true : false,
        textName: data.corporation,
        textContainer: data.Instructions,
      })
      wx.setNavigationBarTitle({
        title: '工单编辑',
      })
    } else {
      this.setData({
        pageStatus: true
      })
      wx.setNavigationBarTitle({
        title: '工单创建',
      })
    }
  },

  // 提交当前内容
  pullContainer() {
    wx.navigateBack();
  },

  // 下拉列表选择监听
  partFruit(e) {
    console.log(e);
  },

  // 下拉列表选择监听
  workTypeFruit(e) {
    if (e.detail.selectId == '巡检工单') {
      this.setData({
        workBaseType: false
      })
    } else {
      this.setData({
        workBaseType: true
      })
    }
  },

  //返回回调函数
  onPickerChange(e) {
    console.log("onPickerChange", e)
  },

  clickPup: function () {
    let _that = this;
    if (!_that.data.click) {
      _that.setData({
        click: true,
      })
    }

    if (_that.data.option) {
      _that.setData({
        option: false,
      })

      // 关闭显示弹窗动画的内容，不设置的话会出现：点击任何地方都会出现弹窗，就不是指定位置点击出现弹窗了
      setTimeout(() => {
        _that.setData({
          click: false,
        })
      }, 500)

      let boolLength = 0;
      let boolTrues = '';
      _that.data.weekRepeat.forEach(item => {
        if (item.click) {
          boolLength++;
          boolTrues += `${item.val}/`
        }
      })
      if (boolLength == 0) {
        _that.setData({
          repeatDate: '不重复'
        })
      } else if (boolLength == 7) {
        _that.setData({
          repeatDate: '每天'
        })
      } else {
        _that.setData({
          repeatDate: boolTrues.slice(0, -1)
        })
      }
    } else {
      _that.setData({
        option: true,
        popupType: true
      })
    }
  },

  // 当前选择日期
  chooseWeekFun(e) {
    let index = e.currentTarget.dataset.index
    let bool = this.data.weekRepeat[index].click
    this.setData({
      ['weekRepeat[' + index + '].click']: !bool
    });
  },

  // 新增时间选择项
  addNewListFun() {
    let index = this.data.addNewDateList.length;
    this.setData({
      ['addNewDateList[' + index + ']']: {
        timeStart: new Date().getTime(),
        endStart: new Date().getTime()
      }
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