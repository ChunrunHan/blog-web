import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'animate.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/public.css'
Vue.config.productionTip = false
Vue.use(iView);
import { Component } from 'vue-property-decorator';
Component.registerHooks([
    'beforeRouteEnter',//进入路由之前
    'beforeRouteLeave',//离开路由之前
    'beforeRouteUpdate'
])

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
