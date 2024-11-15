import { createWebHistory, createRouter } from 'vue-router'
import LoginView from "../views/LoginView.vue"
import HomeView from "../views/HomeView.vue"
import ProductsView from "../views/ProductsView.vue";
import ProductView from "../views/ProductView.vue";
import CartView from "../views/CartView.vue";

const routes = [
    {path: '/', name: 'home', component: HomeView},
    {path: '/login/', name: 'login', component: LoginView},
    {path: '/products/', name: 'products', component: ProductsView},
    {path: '/products/:id/', name: 'product', component: ProductView},
    {path: '/cart/', name: 'cart', component: CartView},
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
