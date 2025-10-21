// miniprogram/pages/record/manual/manual.js
Page({
  data: {
    // 使用微信原生 picker
    categoryColumns: ['饮食', '交通', '商品', '能源'],
    categoryValues: ['diet', 'transport', 'goods', 'energy'],
    form: {
      recordType: '',
      itemName: '',
      quantity: 0,
      unit: ''
    }
  },

  // 显示分类选择器 - 使用微信原生
  onShowCategoryPicker() {
    console.log('显示微信原生选择器');
    wx.showActionSheet({
      itemList: this.data.categoryColumns,
      success: (res) => {
        console.log('用户选择了索引:', res.tapIndex);
        const actualValue = this.data.categoryValues[res.tapIndex];
        console.log(actualValue);
        this.setData({
          'form.recordType': actualValue
        });
        console.log('设置成功! form.recordType =', this.data.form.recordType);
      },
      fail: (err) => {
        console.log('选择取消', err);
      }
    });
  },

  // 项目名称输入
  onItemNameChange(event) {
    this.setData({
      'form.itemName': event.detail
    });
  },

  // 数量输入
  onQuantityChange(event) {
    this.setData({
      'form.quantity': parseFloat(event.detail) || 0
    });
  },

  // 单位输入
  onUnitChange(event) {
    this.setData({
      'form.unit': event.detail
    });
  },

  // 提交表单
  async onSubmit() {
    console.log('onSubmit 被调用了！');
    const form = this.data.form;

    // 调试：检查当前表单状态
    console.log(' 提交前表单数据:', {
      recordType: form.recordType,
      itemName: form.itemName, 
      quantity: form.quantity,
      unit: form.unit
    });

    // 校验
    if (!form.recordType || !form.itemName || form.quantity <= 0 || !form.unit) {
      console.log(' 表单验证失败');
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    // 显示加载状态
    this.setData({ isLoading: true });
    wx.showLoading({ title: '提交中...', mask: true });

    try {
      console.log('开始调用云函数 recordManual...');
      
      // 调用云函数
      const result = await wx.cloud.callFunction({
        name: 'recordManual',
        data: {
          itemName: form.itemName,
          quantity: form.quantity,
          unit: form.unit,
          recordType: form.recordType
        }
      });

      console.log('云函数返回结果:', result);

      if (result.result.success) {
        wx.showToast({ title: '记录成功！', icon: 'success' });
        
        // 清空表单
        this.setData({
          form: {
            recordType: '',
            itemName: '',
            quantity: 0,
            unit: ''
          }
        });

        // 延迟返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      } else {
        throw new Error(result.result.error || '提交失败');
      }

    } catch (error) {
      console.error('提交失败:', error);
      wx.showToast({ 
        title: error.message || '网络错误，请重试', 
        icon: 'none',
        duration: 3000
      });
    } finally {
      this.setData({ isLoading: false });
      wx.hideLoading();
    }
  }
})