import router from '@/router'
import store from '@/store'

const whileList = ['/login', '/404'] // 设置白名单

router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 如果有token
    if (to.path === '/login') { // 在登录页登录
      return next('/') // 就跳转往首页
    } else {
      return next() // 如果没有就放行
    }
  } else {
    if (whileList.indexOf(to.path) > -1) { // 当是白名单时
      return next() // 直接放行
    } else {
      return next('/login') // 又没有token，也不是白名单，就跳转登录页
    }
  }
})
