import {createRouter, createWebHistory} from 'vue-router'
import Create from "@/views/Create";


const routes = [
    {
        path: '/',
        name: 'Create',
        component: Create
    },
    {
        path:'/list',
        name: 'List',
        component: () => import('@/views/List')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active'
})

export default router;