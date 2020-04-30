import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/random',
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search.vue'),
    },
    {
        path: '/random',
        name: 'Random',
        component: () => import('../views/Random.vue'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
