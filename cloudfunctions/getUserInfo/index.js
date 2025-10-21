// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event) => {
  console.log('收到登录请求 event:', event);
  
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  
  console.log('微信上下文:', {
    OPENID: wxContext.OPENID,
    APPID: wxContext.APPID,
    UNIONID: wxContext.UNIONID
  });

  try {
    const db = cloud.database();
    
    // 检查用户是否存在
    const userRes = await db.collection('users')
      .where({ _openid: openid })
      .get();
    
    console.log('用户查询结果:', userRes);

    let userInfo;
    
    if (userRes.data.length === 0) {
      // 新用户 - 创建记录
      console.log('创建新用户...');
      const createRes = await db.collection('users').add({
        data: {
          _openid: openid,
          nickName: '微信用户',
          avatarUrl: '',
          totalCarbonReduced: 0,
          createdAt: db.serverDate()
        }
      });
      console.log('新用户创建成功:', createRes);
      userInfo = { 
        _openid: openid, 
        totalCarbonReduced: 0, 
        nickName: '微信用户',
        avatarUrl: ''
      };
    } else {
      userInfo = userRes.data[0];
      console.log('现有用户信息:', userInfo);
    }
    
    // 返回标准格式
    return {
      success: true,
      openid: openid,
      userInfo: userInfo,
      message: userRes.data.length === 0 ? '新用户注册成功' : '登录成功'
    };
    
  } catch (error) {
    console.error('登录过程错误:', error);
    return {
      success: false,
      error: '服务器错误: ' + error.message
    };
  }
};