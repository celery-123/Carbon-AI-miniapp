// 添加时间格式化函数
function formatTime(date) {
  if (!date) return '';
  
  const time = new Date(date);
  const now = new Date();
  const diff = now - time;
  
  // 今天内显示时间
  if (diff < 24 * 60 * 60 * 1000) {
    return time.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  // 今年内显示月日
  if (time.getFullYear() === now.getFullYear()) {
    return time.toLocaleDateString('zh-CN', { 
      month: '2-digit', 
      day: '2-digit' 
    });
  }
  
  // 其他显示年月日
  return time.toLocaleDateString('zh-CN', { 
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit' 
  });
}

module.exports = {
  formatTime
};