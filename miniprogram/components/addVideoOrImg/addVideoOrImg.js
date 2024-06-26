// components/addVideoOrImg/addVideoOrImg.js
Component({

  /**
   * 组件的属性列表
   */

  properties: {
    imgList: {
      type: Array,
      value: [] // 默认值为空数组
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgList: [], // 上传列表 
    src: "", // 上传视频
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击添加选择
    chooseSource: function () {
      var _this = this;
      wx.showActionSheet({
        itemList: ["拍照", "从相册中选择"],
        itemColor: "#000000",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              _this.imgWShow("camera") //拍照
            } else if (res.tapIndex == 1) {
              _this.imgWShow("album") //相册
            }
          }
        }
      })
    },
    // 点击调用手机相册/拍照
    imgWShow: function (type) {
      var _this = this;
      let len = 0;
      if (_this.data.imgList != null) {
        len = _this.data.imgList.length
      } //获取当前已有的图片
      wx.chooseImage({
        count: 6 - len, //最多还能上传的图片数,这里最多可以上传5张
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图,默认二者都有
        sourceType: [type], //可以指定来源是相册还是相机, 默认二者都有
        success: function (res) {
          wx.showToast({
            title: '正在上传...',
            icon: "loading",
            mask: true,
            duration: 1000
          })
          var imgList = res.tempFilePaths
          let tempFilePathsImg = _this.data.imgList
          var tempFilePathsImgs = tempFilePathsImg.concat(imgList)
          _this.setData({
            imgList: tempFilePathsImgs,
          })
        },
        fail: function () {
          wx.showToast({
            title: '图片上传失败',
            icon: 'none'
          })
          return;
        }
      })
    },
    // 预览图片
    previewImg: function (e) {
      let index = e.target.dataset.index;
      let _this = this;
      wx.previewImage({
        current: _this.data.imgList[index],
        urls: _this.data.imgList
      })
    },
    /**
     * 点击删除图片
     */
    deleteImg: function (e) {
      var _this = this;
      var imgList = _this.data.imgList;
      var index = e.currentTarget.dataset.index; //获取当前点击图片下标
      wx.showModal({
        title: '提示',
        content: '确认要删除该图片吗?',
        success: function (res) {
          if (res.confirm) {
            imgList.splice(index, 1);
          } else if (res.cancel) {
            return false
          }
          _this.setData({
            imgList,
          })
        }
      })
    },
    /**
     * 点击删除视频
     */
    deleteVideo: function (e) {
      var _this = this;
      var src = _this.data.src;
      var index = e.currentTarget.dataset.index; //获取当前点击图片下标
      wx.showModal({
        title: '提示',
        content: '确认要删除该视频吗?',
        success: function (res) {
          if (res.confirm) {
            console.log("点击确定了")
            var unsrc = '';
            _this.setData({
              src: unsrc
            })
          } else if (res.cancel) {
            console.log("点击取消了");
            return false
          }
        }
      })
    },
    /**
     * 图片  视频 选择框
     */
    actioncnt: function () {
      var _this = this;
      wx.showActionSheet({
        itemList: ['图片'],
        success: function (res) {
          if (res.tapIndex == 0) {
            _this.chooseSource()
          }
          if (res.tapIndex == 1) {
            _this.chooseVideo()
          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    },
    /**
     * 选择视频
     */
    chooseVideo: function () {
      var _this = this;
      wx.chooseVideo({
        success: function (res) {
          _this.setData({
            src: res.tempFilePath,
          })
        }
      })
    },
    /**
     * 上传视频 目前后台限制最大100M, 以后如果视频太大可以选择视频的时候进行压缩
     */
    uploadvideo: function () {
      var src = this.data.src;
      // wx.uploadFile({
      //   url: '',
      //   methid: 'POST', // 可用可不用
      //   filePath: src,
      //   name: 'files', // 服务器定义key字段名称
      //   header: app.globalData.header,
      //   success: function () {
      //     console.log('视频上传成功')
      //   },
      //   fail: function () {
      //     console.log('接口调用失败')
      //   }
      // })
    },
  }
})