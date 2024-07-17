// inspectionpage/pages/workEditing/workEditing.js
import {
  requestToken,
  baseHttpUrl,
  requestToimgs
} from '../../../http/request'
import {
  putWarnMsg,
  getTimesOtherType_one,
  getSandM,
  processImages
} from '../../../helpers/index.js'
const base64 = require('../../../libs/base64');

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
    btmWZId: '',
    btmWZits: [],
    btmPeopleId: '',
    btmPeopleits: [],

    selectpeopleArr: null,

    originImgList: [],
    originImgObjs: [],
    editBaseImg: [],
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
      let that = this
      if (data.imgs && data.imgs.length > 0) {
        let img = data.imgs
        let picImg = [];
        let picObj = [];
        let promises = img.map(dev => {
          let str = `xunjian/ins_handle_file?handle_file=${dev}`;
          return requestToimgs(str, 'get', {}).then(res => {
            const uint8Array = new Uint8Array(res);
            const base64Data = 'data:image/png;base64,' + base64.fromByteArray(uint8Array);
            picImg.push(base64Data);
            picObj.push([dev, base64Data]);
          });
        });
        Promise.all(promises).then(() => {
          that.setData({
            originImgList: picImg,
            originImgObjs: picObj,
          });
        })
      }
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

        let bm = [],
          bmdata = [];
        for (let k in res.data.departments) {
          if (k == arr[0].id) {
            res.data.departments[k].forEach(item => {
              bm.push(item.post);
            })
          }
        }
        bm = [...new Set(bm)];
        bm.forEach((item) => {
          bmdata.push({
            name: item,
            id: item
          });
        });

        // let gwOptions = [];
        // for (let k in res.data.departments) {
        //   if (k == arr[0].id) {
        //     res.data.departments[k].forEach((item) => {
        //       if (item.post == bmdata[0].id) {
        //         gwOptions.push({
        //           name: item.name,
        //           id: item.id,
        //         });
        //       }
        //     });
        //   }
        // }


        let imgList = [];
        datas && datas.imgs && datas.imgs.forEach(ty => {
          imgList.push(ty[1])
        })

        that.setData({
          // btmPeopleits: gwOptions,
          // btmPeopleId: datas ? datas.people[2] : gwOptions[0].name,
          btmWZits: bmdata,
          selectpeopleArr: res.data.departments,
          partits: arr,
          partId: datas ? datas.department : arr[0].id,
          workTypeId: datas ? datas.type : '普通工单',
          workBaseType: datas ? datas.type == '普通工单' ? true : false : true,
          textName: datas ? datas.corporation : '',
          textContainer: datas ? datas.Instructions : '',
          timeForstartTwo: datas ? new Date(datas.taskcycle[1]).getTime() : new Date(getTimesOtherType_one(new Date().getTime())).getTime(),
          btmWZId: datas ? datas.people[1] : bmdata[0].id,
          btmPartits: arr,
          btmPartId: datas ? datas.people[0] : arr[0].id,

          editBaseImg: datas ? datas.imgs : [],

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
        that.qySelectPeople(datas ? datas.people[1] : bmdata[0].id, datas ? datas.people[2] : null)
      } else {
        putWarnMsg(res.msg)
      }
    }).catch(res => {
      putWarnMsg(res.msg)
    })
  },

  popupPartSelect(val) {
    let bm = [],
      bmdata = [];
    for (let k in this.data.selectpeopleArr) {
      if (k == val.detail.selectId) {
        this.data.selectpeopleArr[k].forEach(item => {
          bm.push(item.post);
        })
      }
    }
    bm = [...new Set(bm)];
    bm.forEach((item) => {
      bmdata.push({
        name: item,
        id: item
      });
    });
    this.setData({
      btmPartId: val.detail.selectId,
      btmWZits: bmdata,
      btmWZId: bmdata[0].id
    })
    this.qySelectPeople(bmdata[0].id)
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
    let arr = [];
    for (let k in this.data.selectpeopleArr) {
      if (k == this.data.btmPartId) {
        this.data.selectpeopleArr[k].forEach((item) => {
          if (item.post == val) {
            arr.push({
              name: item.name,
              id: item.id,
            });
          }
        });
      }
    }
    this.setData({
      btmPeopleits: arr,
      btmPeopleId: focus ? focus : arr[0].name
    })
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
      }
      console.log(params);
      putAjax(params)
    }

    function putAjax(dev) {
      wx.showModal({
        title: '确认提交？',
        content: '是否确认提交？',
        success: function (res) {
          if (res.confirm) {
            const addVideoOrImgComponent = that.selectComponent('#addVideoOrImgComponent');
            const imgList = addVideoOrImgComponent.data.imgList;

            if (that.data.pageStatus == false) {
              let event_pic = that.data.editBaseImg;
              let pic_del = [];
              let event_file = [];
              imgList.forEach(dv => {
                if (!dv.includes('data:image/png;base64')) {
                  event_file.push(dv)
                }
              })
              that.data.originImgObjs.forEach(dv => {
                let status = false;
                imgList.forEach((dt) => {
                  if (dv[1] == dt) {
                    status = true;
                  }
                });
                if (!status) pic_del.push(dv[0]);
              })

              dev.id = that.data.editDatas.id;
              dev.event_pic = JSON.stringify(event_pic);
              dev.pic_del = JSON.stringify(pic_del);
              dev.event_file = event_file.length == 0 ? JSON.stringify(event_file) : event_file;

              console.log('此处是提交的所有数据汇总输出：', dev);
              processImages(imgList)
                .then(newImageList => {
                  if (event_file.length == 0) {
                    requestToken(`xunjian/inspection_app_edit`, 'post', {
                      ...dev
                    }).then(res => {
                      if (res.code == 0) {
                        wx.showToast({
                          title: '操作成功',
                          icon: 'success',
                          duration: 2000,
                          complete: function () {
                            setTimeout(() => {
                              wx.navigateBack();
                            }, 2000);
                          }
                        });
                      } else {
                        wx.showToast({
                          title: res.message,
                          icon: 'none'
                        });
                      }
                    })
                  } else {
                    async function uploadFilesSequentially(newImageList, callback) {
                      for (let index = 0; index < newImageList.length; index++) {
                        const filePath = newImageList[index];
                        try {
                          const res = await new Promise((resolve, reject) => {
                            wx.uploadFile({
                              url: baseHttpUrl + 'xunjian/inspection_app_edit',
                              filePath: filePath,
                              name: 'file',
                              formData: index == 0 ? {
                                ...dev
                              } : index == newImageList.length - 1 ? {
                                id: dev.id,
                                last_update: 1
                              } : {
                                id: dev.id
                              },
                              header: {
                                'token': app.globalData.userToken
                              },
                              success: (res) => {
                                resolve(res);
                              },
                              fail: (err) => {
                                reject(err);
                              }
                            });
                          });
                        } catch (err) {
                          wx.showToast({
                            title: err,
                            icon: 'none',
                            duration: 2000,
                          });
                        }
                      }

                      // 所有文件上传完成后调用回调函数
                      if (callback && typeof callback === 'function') {
                        callback();
                      }
                    }
                    uploadFilesSequentially(event_file, () => {
                      wx.showToast({
                        title: '操作成功',
                        icon: 'success',
                        duration: 2000,
                        complete: function () {
                          setTimeout(() => {
                            wx.navigateBack();
                          }, 2000);
                        }
                      });
                    });
                  }
                })
            } else {
              var lastId;
              processImages(imgList)
                .then(newImageList => {
                  if (newImageList.length == 0) {
                    dev.event_pic = [];
                    requestToken(`xunjian/inspection_app`, 'POST', {
                      ...dev
                    }).then(res => {
                      if (res.code == 0) {
                        wx.showToast({
                          title: '操作成功',
                          icon: 'success',
                          duration: 2000,
                          complete: function () {
                            setTimeout(() => {
                              wx.navigateBack();
                            }, 2000);
                          }
                        });
                      } else {
                        wx.showToast({
                          title: res.message,
                          icon: 'none'
                        });
                      }
                    })
                  } else {
                    async function uploadFilesSequentially(newImageList, callback) {
                      for (let index = 0; index < newImageList.length; index++) {
                        const filePath = newImageList[index];
                        try {
                          const res = await new Promise((resolve, reject) => {
                            wx.uploadFile({
                              url: baseHttpUrl + 'xunjian/inspection_app',
                              filePath: filePath,
                              name: 'file',
                              formData: index === 0 ? {
                                ...dev
                              } : {
                                last_id: lastId
                              },
                              header: {
                                'token': app.globalData.userToken
                              },
                              success: (res) => {
                                if (index == 0) lastId = JSON.parse(res.data).last_id;
                                resolve(res);
                              },
                              fail: (err) => {
                                reject(err);
                              }
                            });
                          });
                        } catch (err) {
                          wx.showToast({
                            title: err,
                            icon: 'none',
                            duration: 2000,
                          });
                        }
                      }

                      // 所有文件上传完成后调用回调函数
                      if (callback && typeof callback === 'function') {
                        callback();
                      }
                    }
                    uploadFilesSequentially(newImageList, () => {
                      wx.showToast({
                        title: '操作成功',
                        icon: 'success',
                        duration: 2000,
                        complete: function () {
                          setTimeout(() => {
                            wx.navigateBack();
                          }, 2000);
                        }
                      });
                    });
                  }
                })
            }
          }
        }
      })
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
    let selectedDate = new Date(e.detail.value);
    let today = new Date();
    if (selectedDate >= today) {
      this.setData({
        timeForstartTwo: new Date(e.detail.value).getTime()
      })
    } else {
      let that = this
      wx.showToast({
        title: '请选择正确的时间，已调整为当前日期时间',
        icon: 'none'
      });
      let componentRef = this.selectComponent('#putongGondanTimes'); // 替换为你的组件 ID
      componentRef.updateDateTime(new Date().getTime()); // 更新为当前时间的毫秒数
      that.setData({
        timeForstartTwo: new Date().getTime()
      })
    }
  },

  xjStart(e) {
    let selectedDate = new Date(e.detail.value);
    let today = new Date();
    if (selectedDate >= today) {
      this.setData({
        questForstart: new Date(e.detail.value).getTime()
      })
    } else {
      let that = this
      wx.showToast({
        title: '请选择正确的时间，已调整为当前日期时间',
        icon: 'none'
      });
      let componentRef = this.selectComponent('#xunjianGondanStartTime'); // 替换为你的组件 ID
      componentRef.updateDateTime(new Date().getTime()); // 更新为当前时间的毫秒数
      that.setData({
        questForstart: new Date().getTime()
      })
    }
  },

  xjEnd(e) {
    let selectedDate = new Date(e.detail.value);
    let today = new Date();
    if (selectedDate >= today) {
      this.setData({
        questForstartTwo: new Date(e.detail.value).getTime()
      })
    } else {
      let that = this
      wx.showToast({
        title: '请选择正确的时间，已调整为当前日期时间',
        icon: 'none'
      });
      let componentRef = this.selectComponent('#xunjianGondanEndTime'); // 替换为你的组件 ID
      componentRef.updateDateTime(new Date().getTime()); // 更新为当前时间的毫秒数
      that.setData({
        questForstartTwo: new Date().getTime()
      })
    }
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