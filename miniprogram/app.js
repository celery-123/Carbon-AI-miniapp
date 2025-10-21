// miniprogram/app.js
App({
  globalData: {
    userInfo: null,
    carbonItems: [],
    totalCarbonReduced: 0
  },
  onLaunch() {
    console.log('App Launch - 初始化云开发');
    
    // 初始化云开发
    wx.cloud.init({
      env: 'cloud1-4gfzafdt75bac67a', // 确保这里正确
      traceUser: true
    });

    // 检查登录状态
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    const openid = wx.getStorageSync('openid');
    
    console.log('检查登录状态:', { userInfo, openid });
    
    if (userInfo && openid) {
      this.globalData.userInfo = userInfo;
      this.globalData.openid = openid;
      this.globalData.isLogin = true;
      console.log('已有登录状态，用户:', userInfo);
    } else {
      console.log('未登录，跳转到登录页');
      // 未登录时跳转到登录页
      wx.reLaunch({
        url: '/pages/me/me'
      });
    }
  }
});