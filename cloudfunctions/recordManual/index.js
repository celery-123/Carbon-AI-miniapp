// cloudfunctions/recordManual/index.js
const cloud = require('wx-server-sdk');
cloud.init({ env: process.env.CLOUD_ID });

exports.main = async (event) => {
  const { itemName, quantity, unit, recordType } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const db = cloud.database();

  console.log('收到手动记录请求:', { itemName, quantity, unit, recordType, openid });

  try {
    // 1. 查询碳排放因子 - 先尝试精确匹配
    let itemRes = await db.collection('carbon_items')
      .where({
        name: db.RegExp({
          regexp: `^${itemName}$`,
          options: 'i'
        }),
        category: recordType
      })
      .get();

    // 如果精确匹配不到，尝试模糊匹配
    if (itemRes.data.length === 0) {
      itemRes = await db.collection('carbon_items')
        .where({
          name: db.RegExp({
            regexp: itemName,
            options: 'i'
          })
        })
        .get();
    }

    console.log('查询碳项目结果:', itemRes);

    if (itemRes.data.length === 0) {
      return { 
        success: false, 
        error: `未找到"${itemName}"对应的碳足迹数据，请尝试其他名称` 
      };
    }

    const carbonItem = itemRes.data[0];
    const carbonAmount = quantity * carbonItem.carbonFactor;

    console.log('计算碳足迹:', {
      carbonFactor: carbonItem.carbonFactor,
      quantity: quantity,
      carbonAmount: carbonAmount
    });

    // 2. 创建记录
    const recordRes = await db.collection('carbon_records').add({
      data: {
        _openid: openid,
        recordType: recordType,
        description: `${quantity}${unit} ${itemName}`,
        carbonAmount: carbonAmount,
        inputMethod: 'manual',
        aiFeedback: '', // 异步生成
        createdAt: db.serverDate()
      }
    });

    console.log('记录创建成功:', recordRes);

    // 3. 更新用户总碳足迹
    await db.collection('users').where({ _openid: openid })
      .update({
        data: {
          totalCarbonEmitted: db.command.inc(carbonAmount)
        }
      });

    console.log('用户总碳足迹更新成功');

    // 4. 异步调用AI反馈生成（不等待结果）
    try {
      await cloud.callFunction({
        name: 'generateAIFeedback',
        data: { recordId: recordRes._id }
      });
      console.log('AI反馈生成任务已触发');
    } catch (aiError) {
      console.error('AI反馈生成失败:', aiError);
      // 不阻塞主流程
    }

    return { 
      success: true, 
      recordId: recordRes._id,
      carbonAmount: carbonAmount
    };

  } catch (error) {
    console.error('记录失败:', error);
    return { 
      success: false, 
      error: '服务器错误，请稍后重试' 
    };
  }
};