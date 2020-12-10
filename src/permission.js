import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whileList = ['/login', '/404'] // 设置白名单

// 前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) { // 如果有token
    if (to.path === '/login') { // 在登录页登录
      next('/') // 就跳转往首页
    } else {
      next() // 如果没有就放行
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
