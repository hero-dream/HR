import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 引入多个模块的规则
import approvalsRouter from './module/approvals'
import departmentsRouter from './module/departments'
import employeesRouter from './module/employees'
import permissionRouter from './module/permission'
import attendancesRouter from './module/attendances'
import salarysRouter from './module/salarys'
import settingRouter from './module/setting'
import socialRouter from './module/social'

// 静态路由
export const constantRoutes = [

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 文件上传
  {
    path: '/imoort',
    component: Layout,
    redirect: '/imoort',
    hidden: true,
    children: [{
      path: '',
      name: 'imoort',
      component: () => import('../views/imoort'),
      meta: { title: '文件上传', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 动态路由
export const asyncRoutes = [
  departmentsRouter,
  approvalsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes] // 动态，静态路由拼接
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
