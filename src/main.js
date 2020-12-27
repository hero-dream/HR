import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import Component from '@/components'
Vue.use(Component) // 注册自己的插件

// 自定义指令
import { imageerror } from '@/directives'
Vue.directive('imageerror', imageerror)
// import * as directives from '@/directives'
// const keys = Object.keys(directives)
// keys.forEach(key => {
//   console.log(directives[key])
//   Vue.directive(key, directives[key])
// })
// 过滤器
import { formatDate } from '@/filters'
Vue.filter('formatDate', formatDate)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
