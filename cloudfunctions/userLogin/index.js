// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event) => {
  console.log('=== userLogin 云函数被调用 ===')
  console.log('event:', event)
  
  const wxContext = cloud.getWXContext()
  console.log('wxContext:', wxContext)
  
  const db = cloud.database()
  const _ = db.command
  
  try {
    // 获取用户openid
    const openid = wxContext.OPENID
    console.log('用户openid:', openid)
    
    if (!openid) {
      console.error('无法获取openid')
      return {
        success: false,
        error: '无法获取用户身份'
      }
    }
    
    // 查询用户是否已存在
    console.log('查询用户是否存在...')
    const userQuery = await db.collection('users')
      .where({
        _openid: openid
      })
      .get()
    
    console.log('用户查询结果:', userQuery)
    
    let userData
    
    if (userQuery.data.length === 0) {
      // 新用户 - 创建记录
      console.log('创建新用户...')
      const userRecord = {
        _openid: openid,
        nickName: '微信用户',
        avatarUrl: '',
        totalCarbonEmitted: 0,
        createdAt: db.serverDate()
      }
      
      const addResult = await db.collection('users').add({
        data: userRecord
      })
      
      console.log('新用户创建结果:', addResult)
      userData = userRecord
    } else {
      // 老用户
      userData = userQuery.data[0]
      console.log('老用户数据:', userData)
    }
    
    // 返回成功结果
    const result = {
      success: true,
      openid: openid,
      userInfo: userData,
      message: '登录成功'
    }
    
    console.log('返回结果:', result)
    return result
    
  } catch (error) {
    console.error('云函数执行错误:', error)
    return {
      success: false,
      error: '服务器错误: ' + error.message
    }
  }
}