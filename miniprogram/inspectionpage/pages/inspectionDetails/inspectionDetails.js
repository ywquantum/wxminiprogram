import * as THREE from '../../../libs/three.weapp.min.js'
import {
  OrbitControls
} from '../../../jsm/OrbitControls'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseTitle: '',
    baseContainer: '',
    lot: '',
    lnt: '',
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
    popupInner: [{
        value: '监测污水池水位，水位超过设定报警阈值，请及时通知值班人员'
      },
      {
        value: '受现场环境的影响，水位监测系统供电和数据传输未能上传至数据库'
      },
      {
        value: '污水池未关闭污水进口阀门'
      },
    ],
    popupType: true,
    switch1Checked: true,

    partits: [{
        name: '值更棒1号',
        id: '值更棒1号'
      },
      {
        name: '值更棒2号',
        id: '值更棒2号'
      },
      {
        name: '值更棒3号',
        id: '值更棒3号'
      },
    ],
    partId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let data = JSON.parse(decodeURIComponent(options.baseData))
    this.setData({
      baseTitle: data.corporation,
      baseContainer: data.Instructions
    })

    // wx.createSelectorQuery()
    //   .select('#threeId')
    //   .node()
    //   .exec((res) => {
    //     const canvas = THREE.global.registerCanvas(res[0].node)

    //     this.setData({
    //       canvasId: canvas._canvasId
    //     })

    //     const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 10, 100000);
    //     camera.position.set(-124.5015, 585.0608, -93.3686);
    //     const scene = new THREE.Scene();
    //     scene.background = new THREE.Color(0xAAAAAA);
    //     const renderer = new THREE.WebGLRenderer({
    //       antialias: true
    //     });

    //     const controls = new OrbitControls(camera, renderer.domElement);
    //     controls.touches = {
    //       ONE: THREE.TOUCH.PAN,
    //       TWO: THREE.TOUCH.DOLLY_PAN
    //     };
    //     controls.target.set(-124.8207, 0, -108.6094);
    //     controls.minDistance = 0;
    //     controls.maxDistance = 900;
    //     controls.maxPolarAngle = Math.PI * 0.45;
    //     controls.enableRotate = false;
    //     controls.update();

    //     renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
    //     renderer.setSize(canvas.width, canvas.height);

    //     function onWindowResize() {
    //       camera.aspect = window.innerWidth / window.innerHeight;
    //       camera.updateProjectionMatrix();
    //       renderer.setSize(canvas.width, canvas.height);
    //     }

    //     function render() {
    //       canvas.requestAnimationFrame(render);

    //       controls.update();
    //       renderer.render(scene, camera);
    //     }

    //     render();
    //     // this.addPlaneBG(scene);
    //     // this.acquireLocation();
    //   })
  },

  // 添加基础地图片
  addPlaneBG(scene) {
    let floorMsgArrs = [
      // {
      //   center: [0, 0],
      //   url: "../../images/scene/scenePic.jpg"
      // },
      // {
      //   center: [1920, 0],
      //   url: "../../images/scene/scenePic1.jpg"
      // },
      // {
      //   center: [1920, -1080],
      //   url: "../../images/scene/scenePic2.jpg"
      // },
      // {
      //   center: [0, -1080],
      //   url: "../../images/scene/scenePic3.jpg"
      // },
      // {
      //   center: [-1920, -1080],
      //   url: "../../images/scene/scenePic4.jpg"
      // },
      // {
      //   center: [-1920, 0],
      //   url: "../../images/scene/scenePic5.jpg"
      // },
      // {
      //   center: [-1920, 1080],
      //   url: "../../images/scene/scenePic6.jpg"
      // },
      // {
      //   center: [0, 1080],
      //   url: "../../images/scene/scenePic7.jpg"
      // },
      // {
      //   center: [1920, 1080],
      //   url: "../../images/scene/scenePic8.jpg"
      // },
      {
        center: [0, 0],
        url: "../../images/scene/newBG.jpg"
      }
    ];

    floorMsgArrs.forEach((item) => {
      const geometry = new THREE.PlaneGeometry(1920, 1080);
      const loader = new THREE.TextureLoader();
      loader.load(item.url, function (texture) {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        plane.position.set(item.center[0], 0, item.center[1]);
        scene.add(plane);
      });
    });

    const geometryplant = new THREE.PlaneGeometry(57600, 32400);
    const materialplant = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: 0x000000,
    });
    const planes = new THREE.Mesh(geometryplant, materialplant);
    planes.rotation.set(-Math.PI / 2, 0, 0);
    planes.position.set(0, -2, 0);
    scene.add(planes);
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
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
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

  userOldRecord: function () {
    this.setData({
      popupType: false
    })
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


    } else {
      _that.setData({
        option: true,
        popupType: true
      })
    }
  },

  popupRecordFun() {
    this.setData({
      popupType: false
    })
  },

  popupMakeSure() {
    let that = this;
    wx.showModal({
      title: '确认提交？',
      content: '提交后无法再次更改，确认提交吗？',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          that.clickPup();
        } else { //这里是点击了取消以后
        }
      }
    })
  },

  switch1Change() {
    console.log('切换状态');
  },

  endDetails() {
    console.log('开始巡检');
    // wx.navigateBack();
  }
})