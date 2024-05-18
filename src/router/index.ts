import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Login.vue";
import Info from "@/views/Info.vue";
import bdMap from "@/views/bdMap.vue";
import MapPoint from "@/views/MapPoint.vue";
import Header from "@/components/Header.vue";
import UserDetail from "@/views/UserDetail.vue";
import POIMap from "@/views/POIMap.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/login',
            component: Header,
            children: [
                {
                    path: 'map',
                    name: 'map',
                    component: bdMap
                },
                {
                    path: 'poi',
                    name: 'poi',
                    component: POIMap
                },
                {
                    path: 'mapPoint',
                    name: 'mapPoint',
                    component: MapPoint
                },
                {
                    path: "/info",
                    name: "info",
                    component: Info
                },
                {
                    path: "/userDetail/:id",  // userDetail/id
                    name: "userDetail",
                    component: UserDetail
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requireAuth: false // 不需要鉴权
            }
        },
        {
            path: '/:pathMatch(.*)*', // 捕获所有未定义的路径
            name: '404', component: () => import('@/views/404.vue'), meta: {requireAuth: false}
        }
    ]
})

router.beforeEach((to, from, next) => {
    const type = to.meta.type
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        // 该路由需要登录权限
        if (sessionStorage.getItem('token')) {
            // 已登录
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})
export default router
