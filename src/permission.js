import router from '@/router'
import store from '@/store'

import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
import { asyncRoutes } from '@/router'

const whileList = ['/login', '/404'] // 设置白名单

// 前置守卫
router.beforeEach(async(to, from, next) => { // 函数(to, from, next)
  NProgress.start() // 开启进度条
  if (store.getters.token) { // 如果有token
    if (to.path === '/login') { // 在登录页登录
      next('/') // 就跳转往首页
    } else {
      if (!store.getters.userId) {
        // const res = await store.dispatch('user/getUserInfo') // 获取用户信息，异步

        // router.addRoutes(asyncRoutes) // 添加动态路由
        // next(to.path) // 如果是添加路由，由于vue-router的缺陷，需要在一个地址跳转一次才行
      // }
      // 如果是添加路由，由于vue-router的缺陷，需要在一个地址跳转一次才行
      // next(to.path) // 没有else会死循环
      }
      next() // 如果没有路由就放行
    }
  } else {
    if (whileList.indexOf(to.path) > -1) { // 当是白名单时
      next() // 直接放行
    } else {
      next('/login') // 又没有token，也不是白名单，就跳转登录页
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
