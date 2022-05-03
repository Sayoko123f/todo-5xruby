import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import loginView from './components/login-view.vue';
import homeView from './components/home-view.vue';
import registerView from './components/register-view.vue';
const routes = [
    { name: 'home', path: '/', component: homeView },
    { name: 'login', path: '/login', component: loginView },
    { name: 'register', path: '/register', component: registerView },
] as RouteRecordRaw[];

export const router = createRouter({
    routes,
    history: createWebHistory(),
});
