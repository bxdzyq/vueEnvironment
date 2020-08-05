// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//导入操作//根组件 
import App from './App'
//引入element-ui 
import ElementUI from 'element-ui';
//样式文件
import 'element-ui/lib/theme-chalk/index.css';
//图标
import "./assets/font/iconfont.css"
// 引入VueRouter
import router from './router'
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


