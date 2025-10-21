// miniprogram/pages/index/index.js
Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    totalCarbonReduced: 0
  },
  onLoad() {
   
  },
  navigateToRecord() {
    wx.navigateTo({ url: '../record/manual/manual' });
  }
});