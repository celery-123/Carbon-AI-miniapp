const { formatTime } = require('../../utils/util.js');
Page({
  data: {
    isLoading: true,
    dashboardData: {
      totalCarbonEmitted: 0,
      equivalentTrees: 0,
      categoryData: [],
      recentRecords: [],
      penguinMood: 'normal'
    }
  },

  onLoad() {
    this.loadDashboardData();
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadDashboardData();
  },

  async loadDashboardData() {
    this.setData({ isLoading: true });
    
    try {
      const res = await wx.cloud.callFunction({
        name: 'getDashboardData'
      });
      
      if (res.result.success) {
        this.setData({
          dashboardData: res.result.data,
          isLoading: false
        });
        
        // 更新全局状态
        getApp().globalData.penguinStatus = res.result.data.penguinMood;
      } else {
        this.showError('数据加载失败');
      }
    } catch (err) {
      console.error('加载看板数据失败:', err);
      this.showError('网络异常，请重试');
    }
  },

  showError(message) {
    this.setData({ isLoading: false });
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  },

  // 跳转到记录页面
  navigateToRecord() {
    wx.navigateTo({
      url: '/pages/record/manual/manual'
    });
  },

  // 查看记录详情
  viewRecordDetail(e) {
    const recordId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/record/detail/detail?id=${recordId}`
    });
  },
  // 在 data 中添加格式化函数
  formatTime: formatTime
});