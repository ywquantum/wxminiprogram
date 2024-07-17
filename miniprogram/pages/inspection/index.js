import { requestToken, requestToimgs } from "../../http/request";
import {
    getTimesOtherType,
    putWarnMsg,
    getTimesOtherType_one,
    arrayBufferToBase64,
} from "../../helpers/index";
const base64 = require("../../libs/base64");

const app = getApp();

Component({
    behaviors: [],
    // 属性定义（详情参见下文）
    properties: {},
    data: {
        menulist: ["待完成", "已结束", "工单列表"],
        menuTopVal: 0,
        containerMenuList: 0,
        waitEvent: [],
        doneEvent: [],
        workorderData: [],
        selectpeopleArr: null,
        activeName: "",
    },

    lifetimes: {
        attached: function () {
            wx.setNavigationBarTitle({
                title: "工单中心",
            });

            this.getPortData();
            this.getDKSdatas();

            // setInterval(() => {
            //   wx.getLocation({
            //     type: 'gcj02', // 可以是 'wgs84' 或 'gcj02'
            //     success: (res) => {
            //       let obj = {
            //         position: [res.longitude, res.latitude],
            //         id: '22222',
            //         time: parseInt(new Date().getTime() / 1000),
            //         stick_id: 1
            //       }
            //       console.log(obj);
            //     },
            //     fail: (err) => {
            //       console.error("获取位置信息失败", err);
            //     }
            //   });
            // }, 5000);
        },
        moved: function () {},
        detached: function () {},
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
    ready: function () {},

    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {
            if (this.data.containerMenuList == 0) {
                this.getDKSdatas();
            } else if (this.data.containerMenuList == 1) {
                this.getYJSdatas();
            } else if (this.data.containerMenuList == 2) {
                this.getGDlist();
            }
        },
        hide: function () {},
        resize: function () {},
    },

    methods: {
        getPortData() {
            let that = this;
            requestToken("xunjian/get_inspection_list", "get", {})
                .then((res) => {
                    if (res.code == 0) {
                        that.setData({
                            selectpeopleArr: res.data.departments,
                        });
                    } else {
                        putWarnMsg(res.msg);
                    }
                })
                .catch((res) => {
                    putWarnMsg(res.msg);
                });
        },
        getDKSdatas() {
            let that = this;

            that.setData({
                waitEvent: [],
            });
            let str = `xunjian/record_applet?event_type=&page=0&event_department=&executor_id=${app.globalData.userId}&event_overview=1&event_date_start=&event_date_end=`;
            requestToken(str, "get", {})
                .then((res) => {
                    if (res.code == 0) {
                        res.data.inspections.forEach((item, index) => {
                            that.setData({
                                waitEvent: that.data.waitEvent.concat({
                                    corporation: item.event_name,
                                    Instructions: item.event_description,
                                    time: getTimesOtherType(
                                        item.event_date_start
                                    ),
                                    endtime:
                                        item.event_date_end &&
                                        getTimesOtherType(item.event_date_end),
                                    imgs: item.event_pic
                                        ? JSON.parse(item.event_pic)
                                        : [],
                                    type:
                                        item.event_type == 2
                                            ? "workorder"
                                            : "inspection",
                                    id: item.event_id,
                                    imgCoolapse: index,
                                    listId: item.id,
                                }),
                            });
                        });
                    } else {
                        putWarnMsg(res.msg);
                    }
                })
                .catch((res) => {
                    putWarnMsg(res.msg);
                });
        },
        getYJSdatas() {
            let that = this;

            let str = `xunjian/record_applet?event_type=&page=0&event_department=&executor_id=${app.globalData.userId}&event_overview=3&event_date_start=&event_date_end=`;
            requestToken(str, "get", {})
                .then((res) => {
                    if (res.code == 0) {
                        let arr = [];
                        res.data.inspections.forEach((item, index) => {
                            let zhixing;
                            for (let ik in res.data.names) {
                                if (ik == item.executor_id) {
                                    zhixing = res.data.names[ik];
                                }
                            }

                            arr.push({
                                corporation: item.event_name,
                                Instructions: item.event_description,
                                time: getTimesOtherType(item.event_date_start),
                                endtime:
                                    item.event_date_end &&
                                    getTimesOtherType(item.event_date_end),
                                imgs:
                                    item.event_pic &&
                                    JSON.parse(item.event_pic),
                                type:
                                    item.event_type == 2
                                        ? "workorder"
                                        : "inspection",
                                id: item.event_id,
                                status: item.event_status,
                                imgCoolapse: index,
                                event_type: item.event_type,
                                zhixing: zhixing,
                                listId: item.id,
                            });
                        });
                        that.setData({
                            doneEvent: arr,
                        });
                    } else {
                        putWarnMsg(res.msg);
                    }
                })
                .catch((res) => {
                    putWarnMsg(res.msg);
                });
        },
        getGDlist() {
            let that = this;

            that.setData({
                workorderData: [],
            });
            let str = `xunjian/inspection_list_get?event_type=&page=0&event_department=&creator_id=${app.globalData.userId}&event_overview=&executor_id=`;
            requestToken(str, "get", {})
                .then((res) => {
                    if (res.code == 0) {
                        // console.log(res);
                        res.data.inspections.forEach((item) => {
                            let startTime = item.event_date_start
                                ? getTimesOtherType_one(item.event_date_start)
                                : "";
                            let endTime = item.event_date_end
                                ? getTimesOtherType_one(item.event_date_end)
                                : "";
                            let stime = [];
                            if (item.event_type == 2) {
                                stime.push(["", endTime]);
                            } else {
                                let str = item.event_time_gap.split(",");
                                str.forEach((dev) => {
                                    if (dev != "") {
                                        let sr = dev.split("-");
                                        stime.push([sr[0], sr[1]]);
                                    }
                                });
                            }
                            let userPart, userName;
                            for (let k in that.data.selectpeopleArr) {
                                that.data.selectpeopleArr[k].forEach((dev) => {
                                    if (dev.id == item.executor_id) {
                                        userPart = k;
                                        userName = dev.name;
                                    }
                                });
                            }
                            let humanbeing = [
                                userPart,
                                item.user_position,
                                userName,
                            ];
                            let userStatus =
                                item.event_status == "1"
                                    ? "待完成"
                                    : item.event_status == "2"
                                    ? "进行中"
                                    : item.event_status == "3"
                                    ? "已完成"
                                    : "未处理";

                            that.setData({
                                workorderData: that.data.workorderData.concat({
                                    type:
                                        item.event_type == 2
                                            ? "普通工单"
                                            : "巡检工单",
                                    corporation: item.event_name,
                                    Instructions: item.event_description,
                                    imgs: item.event_pics,
                                    taskcycle: [startTime, endTime],
                                    repeat: item.event_frequency,
                                    starttime: stime,
                                    people: humanbeing,
                                    status: userStatus,
                                    department: item.event_department,
                                    id: item.id,
                                }),
                            });
                        });
                    } else {
                        putWarnMsg(res.msg);
                    }
                })
                .catch((res) => {
                    putWarnMsg(res.msg);
                });
        },
        menuFun(e) {
            let val = e.detail;

            this.setData({
                containerMenuList: val,
            });
            if (val == 0) {
                this.getDKSdatas();
            } else if (val == 1) {
                this.getYJSdatas();
            } else if (val == 2) {
                this.getGDlist();
            }
        },
        akyleaveFun() {
            wx.navigateTo({
                url: "../askLeave/askLeave",
            });
        },
        addWorkFun() {
            wx.navigateTo({
                url: "../../inspectionpage/pages/workEditing/workEditing",
            });
        },
        startInspection(e) {
            let baseData = JSON.stringify(e.currentTarget.dataset["index"]);
            var currentTime = new Date();
            var specifiedTime = new Date(e.currentTarget.dataset["index"].time);
            specifiedTime.setMinutes(specifiedTime.getMinutes() - 10);
            // if (currentTime < specifiedTime) {
            //     wx.showToast({
            //         title: "巡检时间未到，暂不支持开始巡检",
            //         icon: "none",
            //         duration: 2000,
            //     });
            // } else {
                wx.reLaunch({
                    url:
                        "../../inspectionpage/pages/inspectionDetails/inspectionDetails?baseData=" +
                        encodeURIComponent(baseData),
                });
            // }
        },
        startWorkorder(e) {
            let baseData = JSON.stringify(e.currentTarget.dataset["index"]);
            wx.navigateTo({
                url:
                    "../../inspectionpage/pages/workOrderDetails/workOrderDetails?baseData=" +
                    encodeURIComponent(baseData),
            });
        },
        endWorkLook(e) {
            let baseData = JSON.stringify(e.currentTarget.dataset["index"]);
            wx.navigateTo({
                url:
                    "../../inspectionpage/pages/isoverDetails/isoverDetails?baseData=" +
                    encodeURIComponent(baseData),
            });
        },
        workOrderFun(e) {
            let baseData = JSON.stringify(e.currentTarget.dataset["index"]);
            wx.navigateTo({
                url:
                    "../../inspectionpage/pages/workEditing/workEditing?baseData=" +
                    encodeURIComponent(baseData),
            });
        },
    },
});
