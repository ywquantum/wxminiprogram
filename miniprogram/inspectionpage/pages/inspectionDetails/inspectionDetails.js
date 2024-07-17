import * as THREE from "../../../libs/three.weapp.min.js";
const base64 = require("../../../libs/base64");
import {
    requestToken,
    requestToimgs,
    baseHttpUrl,
} from "../../../http/request";
import { OrbitControls } from "../../../jsm/OrbitControls";
import {
    processImages,
    getTimesOtherType,
    getTimestampConversion,
    putWarnMsg,
} from "../../../helpers/index";

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        baseTitle: "",
        baseContainer: "",
        lot: "",
        lnt: "",
        click: false, //是否显示弹窗内容
        option: false, //显示弹窗或关闭弹窗的操作动画
        popupInner: [
            // {
            //   value: '受现场环境的影响，水位监测系统供电和数据传输未能上传至数据库'
            // },
        ],
        popupType: true,
        popupUserData: null,
        switch1Checked: true,

        partits: [
            {
                name: "值更棒1",
                id: "1",
            },
            {
                name: "值更棒2",
                id: "2",
            },
            {
                name: "值更棒3",
                id: "3",
            },
        ],
        partId: "值更棒1",

        xjStatus: true,
        allDatas: "",

        textName: "",
        originImgList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let data = JSON.parse(decodeURIComponent(options.baseData));
        // console.log(data);
        this.setData({
            baseTitle: data.corporation,
            baseContainer: data.Instructions,
            allDatas: data,
        });
        if (data.originStatus) {
            this.setData({
                xjStatus: false,
            });
        }
    },

    // 获取用户经纬度信息
    acquireLocation() {
        // let that = this;
        // wx.getLocation({
        //   type: 'wgs84',
        //   success(res) {
        //     that.setData({
        //       lot: res.latitude,
        //       lnt: res.longitude
        //     })
        //   }
        // })
    },

    touchStart(e) {
        // console.log('canvas', e)
        THREE.global.touchEventHandlerFactory("canvas", "touchstart")(e);
    },
    touchMove(e) {
        // console.log('canvas', e)
        THREE.global.touchEventHandlerFactory("canvas", "touchmove")(e);
    },
    touchEnd(e) {
        // console.log('canvas', e)
        THREE.global.touchEventHandlerFactory("canvas", "touchend")(e);
    },
    touchCancel(e) {
        // console.log('canvas', e)
    },
    longTap(e) {
        // console.log('canvas', e)
    },
    tap(e) {
        // console.log('canvas', e)
    },
    documentTouchStart(e) {
        // console.log('document',e)
    },
    documentTouchMove(e) {
        // console.log('document',e)
    },
    documentTouchEnd(e) {
        // console.log('document',e)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},

    userOldRecord: function (e) {
        let baseData = e.currentTarget.dataset["index"];
        // console.log(baseData);
        let that = this;
        this.setData({
            popupType: false,
            textName: baseData.value,
            switch1Checked: baseData.exception_status == 1 ? true : false,
            originImgList: [],
        });
        let img = baseData.event_pic;
        img &&
            img.forEach((item) => {
                let str = `xunjian/ins_handle_file?handle_file=${item}`;
                requestToimgs(str, "get", {}).then((res) => {
                    const uint8Array = new Uint8Array(res);
                    const base64Data =
                        "data:image/png;base64," +
                        base64.fromByteArray(uint8Array);
                    that.setData({
                        originImgList:
                            that.data.originImgList.concat(base64Data),
                    });
                });
            });
    },

    delOldRecord: function (e) {
        let baseData = e.currentTarget.dataset["index"];
        let that = this;
        wx.showModal({
            title: "确认删除？",
            content: "是否确认删除此条历史异常记录？",
            success: function (res) {
                if (res.confirm) {
                    requestToken(`xunjian/history`, "PUT", {
                        id: baseData.id,
                    }).then((res) => {
                        if (res.code == 0) {
                            requestToken(
                                `xunjian/history?executor_id=${app.globalData.userId}`,
                                "GET",
                                {}
                            ).then((res) => {
                                let arr = [];
                                res.data &&
                                    res.data.forEach((item) => {
                                        arr.push({
                                            value: item.exception_description,
                                            event_pic: JSON.parse(
                                                item.event_pic
                                            ),
                                            exception_status:
                                                item.exception_status,
                                            id: item.id,
                                        });
                                    });
                                that.setData({
                                    popupInner: arr,
                                });
                            });
                        } else {
                            putWarnMsg(res.msg);
                        }
                    });
                }
            },
        });
    },

    clickPup: function () {
        let _that = this;
        if (!_that.data.click) {
            _that.setData({
                click: true,
            });
        }

        if (_that.data.option) {
            _that.setData({
                option: false,
            });

            setTimeout(() => {
                _that.setData({
                    click: false,
                });
            }, 500);
        } else {
            _that.setData({
                option: true,
                popupType: true,
                textName: "",
                switch1Checked: true,
            });
            requestToken(
                `xunjian/history?executor_id=${app.globalData.userId}`,
                "GET",
                {}
            ).then((res) => {
                // console.log(res);
                let arr = [];
                res.data &&
                    res.data.forEach((item) => {
                        arr.push({
                            value: item.exception_description,
                            event_pic: JSON.parse(item.event_pic),
                            exception_status: item.exception_status,
                            id: item.id,
                        });
                    });
                _that.setData({
                    popupInner: arr,
                });
            });
        }
    },

    popupRecordFun() {
        this.setData({
            originImgList: [],
            popupType: false,
        });
    },

    popupMakeSure() {
        let that = this;

        wx.showModal({
            title: "确认提交？",
            content: "提交后无法再次更改，确认提交吗？",
            success: function (res) {
                if (res.confirm) {
                    const addVideoOrImgComponent = that.selectComponent(
                        "#addVideoOrImgComponent"
                    );
                    const imgList = addVideoOrImgComponent.data.imgList;
                    let stime = getTimestampConversion(new Date().getTime());

                    processImages(imgList).then((newImageList) => {
                        if (newImageList.length == 0) {
                            requestToken(`xunjian/xunjian_end`, "POST", {
                                id: that.data.allDatas.listId,
                                exception_desc: that.data.textName,
                                exception_status: that.data.switch1Checked
                                    ? 1
                                    : 0,
                                create_time: stime,
                                executor_id: app.globalData.userId,
                            }).then((res) => {
                                that.clickPup();
                            });
                        } else {
                            const uploadTasks = newImageList.map(
                                (filePath, index) => {
                                    return new Promise((resolve, reject) => {
                                        wx.uploadFile({
                                            url:
                                                baseHttpUrl +
                                                "xunjian/xunjian_end",
                                            filePath: filePath,
                                            name: "file",
                                            formData:
                                                newImageList.length == 1
                                                    ? {
                                                          id: that.data.allDatas
                                                              .listId,
                                                          exception_desc:
                                                              that.data
                                                                  .textName,
                                                          exception_status: that
                                                              .data
                                                              .switch1Checked
                                                              ? 1
                                                              : 0,
                                                          create_time: stime,
                                                          executor_id:
                                                              app.globalData
                                                                  .userId,
                                                      }
                                                    : index ==
                                                      newImageList.length - 1
                                                    ? {
                                                          id: that.data.allDatas
                                                              .listId,
                                                          exception_desc:
                                                              that.data
                                                                  .textName,
                                                          exception_status: that
                                                              .data
                                                              .switch1Checked
                                                              ? 1
                                                              : 0,
                                                          create_time: stime,
                                                          executor_id:
                                                              app.globalData
                                                                  .userId,
                                                      }
                                                    : {
                                                          id: that.data.allDatas
                                                              .listId,
                                                          create_time: stime,
                                                      },
                                            header: {
                                                token: app.globalData.userToken,
                                            },
                                            success: (res) => {
                                                resolve(res);
                                            },
                                            fail: (err) => {
                                                reject(err);
                                            },
                                        });
                                    });
                                }
                            );
                            Promise.all(uploadTasks)
                                .then((results) => {
                                    that.clickPup();
                                })
                                .catch((error) => {});
                        }
                    });
                }
            },
        });
    },

    switch1Change(res) {
        this.setData({
            switch1Checked: res.detail.value,
        });
    },

    endDetails() {
        let that = this;
        wx.showModal({
            title: "确认开始巡检？",
            content: "开始巡检后请保持打开当前页面？",
            success: function (res) {
                if (res.confirm) {
                    let stick_id;
                    that.data.partits.forEach((devs) => {
                        if (devs.name == that.data.partId) {
                            stick_id = devs.id;
                        }
                    });
                    requestToken(`xunjian/xunjian_start`, "PUT", {
                        id: that.data.allDatas.listId,
                        event_id: that.data.allDatas.id,
                        stick_id: stick_id,
                    }).then((res) => {
                        that.setData({
                            xjStatus: false,
                        });
                    });
                }
            },
        });
    },

    endingDetails() {
        let that = this;
        wx.showModal({
            title: "结束巡检？",
            content: "请确保巡检任务已完成后点击提交！",
            success: function (res) {
                if (res.confirm) {
                    requestToken(`xunjian/end_xunjian`, "PUT", {
                        id: that.data.allDatas.listId,
                        event_date_start: that.data.allDatas.time,
                        event_date_end: getTimesOtherType(new Date().getTime()),
                        stick_id: 1,
                    }).then((res) => {
                        // wx.navigateBack();
                        wx.reLaunch({
                            url: "../../../pages/index/index",
                        });
                    });
                }
            },
        });
    },

    handleName(e) {
        this.setData({
            textName: e.detail.value,
        });
    },

    partFruit(e) {
        this.setData({
            partId: e.detail.select,
        });
    },
});
