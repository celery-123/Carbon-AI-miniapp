// pages/index/index.js
// miniprogram/pages/index/index.js
Page({
  data: {
    isLoading: true,
    totalCarbon: 0,
    equivalentTrees: 0,
    categoryData: [],
    penguinMood: 'normal'
  },

  /*onLoad() {
    this.fetchDashboardData();
  },

  async fetchDashboardData() {
    this.setData({ isLoading: true });
    try {
      const res = await wx.cloud.callFunction({
        name: 'getDashboardData'
      });
      if (res.result.success) {
        this.setData({
          totalCarbon: res.result.totalCarbonReduced,
          equivalentTrees: (res.result.totalCarbonReduced / 1000).toFixed(1),
          categoryData: res.result.categoryData,
          penguinMood: res.result.penguinMood,
          isLoading: false
        });
        getApp().globalData.penguinStatus = res.result.penguinMood;
      }
    } catch (err) {
      this.setData({ isLoading: false });
      wx.showToast({ title: '数据加载失败', icon: 'none' });
    }
  },*/

  goToRecord() {
    wx.navigateTo({ url: '/pages/record/record' });
  }
});