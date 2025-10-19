Component({
  properties: {
    mood: {  // 接收外部传入的 mood（如 'happy'）
      type: String,
      value: 'normal'
    }
  },
  data: {
    animationPath: '/lottie/penguin-normal.json'  // 默认路径
  },
  observers: {
    'mood': function(mood) {
      // 根据 mood 动态更新路径
      const pathMap = {
        'happy': '/lottie/penguin-happy.json',
        'normal': '/lottie/penguin-normal.json',
        'sad': '/lottie/penguin-sad.json'
      };
      this.setData({
        animationPath: pathMap[mood] || '/lottie/penguin-normal.json'
      });
      // 重新加载动画（可选，如果需要重置）
      this.reloadAnimation();
    }
  },
  methods: {
    reloadAnimation() {
      const lottieComponent = this.selectComponent('#penguin-lottie');
      if (lottieComponent && lottieComponent.lottie) {
        // 获取 lottie 实例，控制播放
        lottieComponent.lottie.play();  // 或 pause()、setSpeed(2)
      }
    }
  }
});