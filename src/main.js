import Vue from 'vue';
import App from './App.vue';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/public.css';
Vue.config.productionTip = false;
Vue.use(iView);
import { Component } from 'vue-property-decorator';
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
]);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
//# sourceMappingURL=main.js.map