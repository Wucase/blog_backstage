import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.css'
import './assets/css/mavonEdit.css'
Vue.config.productionTip = false

// mavonEdit代码高亮
import './plugins/mavonEdit/hljs'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import 'highlight.js/styles/googlecode.css'
import hljs from 'highlight.js'
hljs.highlightCode = function () {
  //自定义highlightCode方法，将只执行一次的逻辑去掉
  let blocks = document.querySelectorAll('pre code');
  [].forEach.call(blocks, hljs.highlightBlock);
};

// // 动画
// import animated from 'animate.css'
// Vue.use(animated)
Vue.prototype.$getCaptcha = process.env.NODE_ENV === 'production'?'http://www.wwming.xyz:3030/api/captcha':"http://127.0.0.1:3030/api/captcha";
// 时间转换
import { timeFormat } from "@/utils/timeFormat";
Vue.prototype.$timeFormat = timeFormat;

import Loading from '@/components/loading'

Vue.component('Loading', Loading)

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
