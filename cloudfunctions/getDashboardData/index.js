// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event) => {
  //获取调用者的身份信息和环境信息，是云函数中实现 “用户关联”“权限控制” 等功能的基础。
  const wxContext=cloud.getWXContext();
  const openid = wxContext.OPENID;
  const db = cloud.database();

  try{
    // 1. 获取用户基本信息
    const userRes = await db.collection('users')
      .where({ _openid: openid })
      .get();
    
    if (userRes.data.length === 0) {
      return { success: false, error: '用户不存在' };
    }

    const user = userRes.data[0];
    
    // 2. 获取最近7天的记录
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recordsRes = await db.collection('carbon_records')
      .where({
        _openid: openid,
        createdAt: db.command.gte(sevenDaysAgo)
      })
      .orderBy('createdAt', 'desc')
      .get();
    
    // 3. 计算分类数据
    const categoryData = {
      diet: 0,
      transport: 0,
      goods: 0
    };
    
    recordsRes.data.forEach(record => {
      if (categoryData.hasOwnProperty(record.recordType)) {
        categoryData[record.recordType] += record.carbonAmount;
      }
    });
    
    // 4. 转换为数组格式供图表使用
    const categoryArray = Object.keys(categoryData).map(category => ({
      category: category,
      amount: Math.round(categoryData[category])
    }));
    
    // 5. 计算相当于种树数量 (简化公式：1kg CO₂ ≈ 0.1棵树)
    const equivalentTrees = Math.round(user.totalCarbonReduced / 1000 * 0.1 * 10) / 10;
    
    // 6. 确定IP形象心情
    const penguinMood = calculatePenguinMood(recordsRes.data);
    
    return {
      success: true,
      data: {
        totalCarbonReduced: user.totalCarbonReduced,
        equivalentTrees: equivalentTrees,
        categoryData: categoryArray,
        recentRecords: recordsRes.data.slice(0, 10), // 最近10条记录
        penguinMood: penguinMood
      }
    };
  }catch(error){
    console.log('获取看板数据失败:', error);
    return{
      success:false,
      error:'数据加载失败'
    };
  }
};

// 根据最近记录计算IP形象心情
function calculatePenguinMood(records) {
  if (records.length === 0) return 'normal';
  
  // 计算最近3条记录的平均碳排放
  const recentRecords = records.slice(0, 3);
  const avgCarbon = recentRecords.reduce((sum, record) => sum + record.carbonAmount, 0) / recentRecords.length;
  
  if (avgCarbon < 1000) return 'happy';     // 低碳：开心
  if (avgCarbon > 5000) return 'sad';       // 高碳：难过
  return 'normal';                          // 中等：普通
}