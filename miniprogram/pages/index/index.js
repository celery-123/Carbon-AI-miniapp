// miniprogram/pages/index/index.js
Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    totalCarbonEmitted: 0,
  },
  onLoad() {
   
  },
  navigateToRecord() {
    wx.navigateTo({ url: '../record/manual/manual' });
  }
});