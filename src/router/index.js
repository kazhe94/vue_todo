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
    },
    {
        path: '/task/:id',
        name: 'Task',
        component: () => import('@/views/Todo')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'link-active',
    linkActiveClass: 'link-active'
})

export default router;