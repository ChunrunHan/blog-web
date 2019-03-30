import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
const NProgress = require('nprogress');
import 'nprogress/nprogress.css';
Vue.use(VueRouter);
const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    // base: "mcdonalds",
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('./views/detail.vue')
        }
    ]
});
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});
export default router;
//# sourceMappingURL=router.js.map