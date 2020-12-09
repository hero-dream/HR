
import { setToken, getToken } from '@/utils/auth'
import { login } from '@/api/user'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    token: getToken() // 设置初始，放入缓存中
  },
  mutations: {
    // 修改token的mutations
    // data为页面token
    setToken(state, data) {
      // 方便使用，但是不能持久化
      state.token = data
      // 引入utils文件，用来存放token，不方便，但是持久化
      setToken(data)
    }
  },
  // 封装登录请求
  actions: {
    // 第一个login是key值
    // 'login':function () {  }
    login(context, data) {
      login(data).then(res => {
        const { message, success, data } = res.data
        if (success) {
          // 因为不在组件，需要单独引入
          // this.$message.success(message)
          Message.success(message)
          console.log('token=' + data)
          // this.$store.commit('user/setToken', data)
          // 不需要写this，因为在本身操作
          context.commit('setToken', data)
        }
      })
    }

  }
}
