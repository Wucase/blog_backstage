export function scrollAnimation(currentY, targetY) {
    // 获取当前位置方法
    // const currentY = document.documentElement.scrollTop || document.body.scrollTop
  
    // 计算需要移动的距离
    let needScrollTop = targetY - currentY;
    let _currentY = currentY;
    setTimeout(() => {
      // 一次调用滑动帧数，每次调用会不一样
      const dist = 20;
      _currentY += dist;
      window.scrollTo(_currentY, currentY);
      // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
      if (needScrollTop > 10 || needScrollTop < -10) {
        scrollAnimation(_currentY, targetY);
      } else {
        window.scrollTo(_currentY, targetY);
      }
    }, 1);
  }
  
  export function scroll() {
    if (window.pageYOffset !== null) {
      return {
        top: window.pageYOffset,
        left: window.pageXOffset,
      };
    } else if (document.compatMode === "CSS1ompat") {
      return {
        top: document.documentElement.scrollTop,
        left: document.documentElement.scrollLeft,
      };
    }
    return {
      top: document.body.scrollTop,
      left: document.body.scrollLeft,
    };
  }
  
  export function client() {
    if (window.innerWidth !== null) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    } else if (document.compatMode === "CSS1Compat") {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      };
    }
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    };
  }
  /**
   * 匀速动画框架
   * @param {Object}obj
   * @param {number}target
   * @param {number}step
   */
  export function animate(obj, index, step) {
    // 1. 清除定时器
    clearInterval(obj.timer);
    let target = index * 40;
    // 2. 设置定时器
    obj.timer = setInterval(function() {
      // 2.1.0 判断方向
      var dir = obj.offsetTop <= target ? step : -step;
  
      // 2.2.1 开始动画
      obj.style.top = obj.offsetTop + dir + "px";
      if (Math.abs(obj.offsetTop - target) < step) {
        // 2.2.2 清除定时器
        clearInterval(obj.timer);
        // 2.2.3 纠正偏差
        obj.style.top = target + "px";
      }
    }, 10);
  }