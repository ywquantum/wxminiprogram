// inspectionpage/pages/workEditing/workEditing.js
import {
  requestToken
} from '../../../http/request'
import {
  putWarnMsg,
  getTimesOtherType_one,
  getSandM,
} from '../../../helpers/index.js'

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    editDatas: null,
    pageStatus: true,
    mode: 'dateTime',
    modeTime: 'time',
    timeForstartTwo: null,
    questForstart: null,
    questForstartTwo: null,

    textName: '',
    textContainer: '',

    addNewDateList: [{
      timeStart: null,
      endStart: null
    }],
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
    weekRepeat: [
      // {
      //   val: '周一',
      //   click: false
      // },
      // {
      //   val: '周二',
      //   click: false
      // },
      // {
      //   val: '周三',
      //   click: false
      // },
      // {
      //   val: '周四',
      //   click: false
      // },
      // {
      //   val: '周五',
      //   click: false
      // },
      // {
      //   val: '周六',
      //   click: false
      // },
      // {
      //   val: '周天',
      //   click: false
      // },
    ],
    repeatDate: '不重复',

    partits: [],
    partId: '',
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

    btmPartId: '',
    btmPartits: [],
    btmWZId: '安全员',
    btmWZits: [{
        name: "安全员",
        id: "安全员"
      },
      {
        name: "负责人",
        id: "负责人"
      },
      {
        name: "其他",
        id: "其他"
      },
    ],
    btmPeopleId: '',
    btmPeopleits: [],

    selectpeopleArr: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.baseData) {
      let data = JSON.parse(decodeURIComponent(options.baseData))
      wx.setNavigationBarTitle({
        title: '工单编辑',
      })
      this.setData({
        pageStatus: false,
        editDatas: data
      })
      this.getPortData(data);
      console.log(data);
    } else {
      this.setData({
        pageStatus: true
      })
      wx.setNavigationBarTitle({
        title: '工单创建',
      })
      this.getPortData();
    }
  },

  getPortData(datas = null) {
    let that = this;

    requestToken('xunjian/get_inspection_list', 'get', {}).then(res => {
      if (res.code == 0) {
        let arr = [];
        for (let k in res.data.departments) {
          arr.push({
            name: k,
            id: k
          });
        }
        let addDatas = []
        if (datas && datas.starttime) {
          datas.starttime.forEach(devs => {
            addDatas.push({
              timeStart: new Date(`2024-05-01 ${devs[0]}:00`).getTime(),
              endStart: new Date(`2024-05-01 ${devs[1]}:00`).getTime()
            })
          })
        }
        that.setData({
          selectpeopleArr: res.data.departments,
          partits: arr,
          partId: datas ? datas.department : arr[0].id,
          workTypeId: datas ? datas.type : '普通工单',
          workBaseType: datas ? datas.type == '普通工单' ? true : false : true,
          textName: datas ? datas.corporation : '',
          textContainer: datas ? datas.Instructions : '',
          timeForstartTwo: datas ? new Date(datas.taskcycle[1]).getTime() : new Date(getTimesOtherType_one(new Date().getTime())).getTime(),
          btmWZId: datas ? datas.people[1] : '安全员',
          btmPartits: arr,
          btmPartId: datas ? datas.people[0] : arr[0].id,

          event_date_start: datas && new Date(datas.taskcycle[0]).getTime(),
          event_date_end: datas && new Date(datas.taskcycle[1]).getTime(),

          questForstart: datas && new Date(datas.taskcycle[0]).getTime(),
          questForstartTwo: datas && new Date(datas.taskcycle[1]).getTime(),
          weekRepeat: (datas && datas.repeat) && [{
              val: '周一',
              click: datas.repeat == '重复' || datas.repeat.includes('周一') ? true : false
            },
            {
              val: '周二',
              click: datas.repeat == '重复' || datas.repeat.includes('周二') ? true : false
            },
            {
              val: '周三',
              click: datas.repeat == '重复' || datas.repeat.includes('周三') ? true : false
            },
            {
              val: '周四',
              click: datas.repeat == '重复' || datas.repeat.includes('周四') ? true : false
            },
            {
              val: '周五',
              click: datas.repeat == '重复' || datas.repeat.includes('周五') ? true : false
            },
            {
              val: '周六',
              click: datas.repeat == '重复' || datas.repeat.includes('周六') ? true : false
            },
            {
              val: '周天',
              click: datas.repeat == '重复' || datas.repeat.includes('周天') ? true : false
            },
          ],
          repeatDate: (datas && datas.repeat) && datas.repeat,
          addNewDateList: addDatas
        })
        that.qySelectPeople(datas ? datas.people[0] : arr[0].id, datas ? datas.people[2] : null)
      } else {
        putWarnMsg(res.msg)
      }
    }).catch(res => {
      putWarnMsg(res.msg)
    })
  },

  popupPartSelect(val) {
    this.setData({
      btmPartId: val.detail.selectId
    })
    this.qySelectPeople(val.detail.selectId)
  },

  popupPositionSelect(val) {
    this.setData({
      btmWZId: val.detail.selectId
    })
  },

  popupHumanSelect(val) {
    this.setData({
      btmPeopleId: val.detail.select
    })
  },

  qySelectPeople(val, focus = null) {
    for (let k in this.data.selectpeopleArr) {
      if (k == val) {
        let arr = [];
        this.data.selectpeopleArr[k].forEach((item) => {
          arr.push({
            name: item.name,
            id: item.id,
          });
        });

        this.setData({
          btmPeopleits: arr,
          btmPeopleId: focus ? focus : arr[0].name
        })
      }
    }
  },

  putBtn() {
    if (this.data.textName == '') {
      putWarnMsg('请输入工单名称')
      return false
    }
    if (this.data.textContainer == '') {
      putWarnMsg('请输入工单内容说明')
      return false
    }

    let that = this,
      executor_id;
    this.data.btmPeopleits.forEach(item => {
      if (item.name == that.data.btmPeopleId) {
        executor_id = item.id
      }
    })

    if (this.data.workBaseType == true) {
      let params = {
        event_type: 2,
        event_name: this.data.textName,
        event_description: this.data.textContainer,
        event_department: this.data.partId,
        user_position: this.data.btmWZId,
        executor_id: executor_id,
        creator_id: app.globalData.userId,
        event_date_end: getTimesOtherType_one(this.data.timeForstartTwo),
        event_file: [],
        event_pic: []
      };
      console.log(params);
      putAjax(params)
    } else {
      let gap = '';
      this.data.addNewDateList.forEach(item => {
        gap += `${getSandM(item.timeStart)}-${getSandM(item.endStart)},`
      })
      gap = gap.slice(0, gap.length - 1);

      let frequ = '';
      let freStatus = '';
      let freIndex = 0;
      this.data.weekRepeat.forEach(item => {
        if (item.click) {
          freStatus += `${item.val},`
          freIndex++
        }
      })
      if (freIndex == 0) {
        frequ = "不重复";
      } else if (freIndex == 7) {
        frequ = "重复";
      } else {
        frequ = freStatus.slice(0, frequ.length - 1);
      }

      let params = {
        event_type: 1,
        event_name: this.data.textName,
        event_description: this.data.textContainer,
        event_department: this.data.partId,
        user_position: this.data.btmWZId,
        executor_id: executor_id,
        creator_id: app.globalData.userId,
        event_date_start: getTimesOtherType_one(this.data.questForstart),
        event_date_end: getTimesOtherType_one(this.data.questForstartTwo),
        event_frequency: frequ,
        event_time_gap: gap,
        event_file: [],
        event_pic: []
      }
      console.log(params);
      putAjax(params)
    }

    function putAjax(dev) {
      if (that.data.pageStatus == false) {
        dev.id = that.data.editDatas.id;
        requestToken('xunjian/inspection_query', 'put', dev).then(res => {
          wx.navigateBack();
        })
      } else {
        requestToken('xunjian/inspection_query', 'post', dev).then(res => {
          wx.navigateBack();
        })
      }
    }
  },

  pullContainer() {
    // wx.navigateBack();
  },

  partFruit(e) {
    this.setData({
      partId: e.detail.selectId
    })
  },

  handleName(e) {
    this.setData({
      textName: e.detail.value
    })
  },

  handleDetails(e) {
    this.setData({
      textContainer: e.detail.value
    })
  },

  workTypeFruit(e) {
    if (e.detail.selectId == '巡检工单') {
      this.setData({
        workBaseType: false,
        questForstart: new Date(getTimesOtherType_one(new Date().getTime())).getTime(),
        questForstartTwo: new Date(getTimesOtherType_one(new Date().getTime())).getTime(),
        repeatDate: '不重复',
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
        addNewDateList: [{
          timeStart: new Date('2024-05-01 00:00:00').getTime(),
          endStart: new Date('2024-05-01 00:00:00').getTime()
        }],
      })
    } else {
      this.setData({
        workBaseType: true,
        timeForstartTwo: new Date(getTimesOtherType_one(new Date().getTime())).getTime(),
      })
    }
  },

  ptEnd(e) {
    this.setData({
      timeForstartTwo: new Date(e.detail.value).getTime()
    })
  },

  xjStart(e) {
    this.setData({
      questForstart: new Date(e.detail.value).getTime()
    })
  },

  xjEnd(e) {
    this.setData({
      questForstartTwo: new Date(e.detail.value).getTime()
    })
  },

  qsTimeStart(e) {
    const index = e.currentTarget.dataset.index;
    const newValue = e.detail.value;
    const newData = this.data.addNewDateList.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          timeStart: new Date(`2024-05-01 ${newValue}`).getTime()
        };
      } else {
        return item;
      }
    });
    this.setData({
      addNewDateList: newData
    });
  },

  qsTimeEnd(e) {
    const index = e.currentTarget.dataset.index;
    const newValue = e.detail.value;
    const newData = this.data.addNewDateList.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          endStart: new Date(`2024-05-01 ${newValue}`).getTime()
        };
      } else {
        return item;
      }
    });
    this.setData({
      addNewDateList: newData
    });
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
          boolTrues += `${item.val},`
        }
      })
      if (boolLength == 0) {
        _that.setData({
          repeatDate: '不重复'
        })
      } else if (boolLength == 7) {
        _that.setData({
          repeatDate: '重复'
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

  chooseWeekFun(e) {
    let index = e.currentTarget.dataset.index
    let bool = this.data.weekRepeat[index].click
    this.setData({
      ['weekRepeat[' + index + '].click']: !bool
    });
  },

  addNewListFun() {
    let index = this.data.addNewDateList.length;
    this.setData({
      ['addNewDateList[' + index + ']']: {
        timeStart: new Date('2024-05-01 00:00:00').getTime(),
        endStart: new Date('2024-05-01 00:00:00').getTime(),
      }
    })
  },

  delBtnFun() {
    let that = this
    wx.showModal({
      title: '确认删除?',
      content: '请确认是否删除该条工单信息?',
      success: function (res) {
        if (res.confirm) {
          requestToken('xunjian/inspection_deleted', 'put', {
            id: that.data.editDatas.id
          }).then(res => {
            wx.navigateBack();
          })
        } else if (res.cancel) {
          return false
        }
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