// cloudfunctions/recordManual/index.js
const cloud = require('wx-server-sdk');
cloud.init({ env: process.env.Env }); // 自动识别当前环境

const db =cloud.database()

//云函数入口
exports.main = async (event,context)=>{
  return await db.collection("carbon_items")
}


