 Page({
   /**
    * 页面的初始数据
    */
   data: {},

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad(options) {
     let data = JSON.parse(decodeURIComponent(options.baseData))
     wx.setNavigationBarTitle({
       title: data.corporation
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

   // 提交当前内容
   pullContainer() {
     wx.showModal({
       title: '确认提交?',
       content: '提交后无法再次更改，确认提交吗?',
       success: function (res) {
         if (res.confirm) {
           wx.navigateBack();
         } else if (res.cancel) {
           return false
         }
       }
     })
   },
 })