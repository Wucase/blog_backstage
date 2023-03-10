// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.css'
import './assets/css/mavonEdit.css'
Vue.config.productionTip = false

// mavonEdit代码高亮
import './plugins/mavonEdit/hljs'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' // 样式文件
hljs.highlightCode = function () {
  //自定义highlightCode方法，将只执行一次的逻辑去掉
  let blocks = document.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
};

Vue.directive('highlight', function (el) {

  let blocks = el.querySelectorAll('pre code');
  console.log('----');
  blocks.forEach((block) => {

    hljs.highlightBlock(block)

  })

})


// // 动画
// import animated from 'animate.css'
// Vue.use(animated)
Vue.prototype.$getCaptcha = process.env.VUE_APP_FULL_URL+ "/api/captcha";

// 时间转换
import { timeFormat } from "@/utils/timeFormat";
Vue.prototype.$timeFormat = timeFormat;

// loading组件
import Loading from '@/components/loading'
Vue.component('Loading', Loading)

// eventBus
Vue.prototype.$eventBus = new Vue();

// 获取图片url
Vue.prototype.$imgUrl = process.env.VUE_APP_FULL_URL;
// element-ui
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
