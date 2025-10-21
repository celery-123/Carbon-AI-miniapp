//me.js
Page({
  handleLogin() {
    wx.showLoading({ title: '登录中...' });
    
    // 第一步：获取code
    wx.login({
      success: (loginRes) => {
        console.log('获取到的code:', loginRes.code);
        
        if (loginRes.code) {
          // 第二步：调用云函数
          wx.cloud.callFunction({
            name: 'userLogin',
            data: { 
              code: loginRes.code 
            },
            success: (res) => {
              wx.hideLoading();
              console.log('云函数返回:', res);
              
              if (res.result && res.result.success) {
                wx.showToast({ title: '登录成功' });
                
                // 存储用户信息
                wx.setStorageSync('userInfo', res.result.userInfo);
                wx.setStorageSync('openid', res.result.openid);
                
                // 跳转回首页
                wx.switchTab({
                  url: '/pages/index/index'
                });
              } else {
                wx.showToast({ 
                  title: res.result.error || '登录失败', 
                  icon: 'none' 
                });
              }
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('云函数调用失败:', err);
              wx.showToast({ 
                title: '网络请求失败', 
                icon: 'none' 
              });
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({ title: '获取登录码失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('wx.login失败:', err);
        wx.showToast({ title: '登录失败', icon: 'none' });
      }
    });
  }
});