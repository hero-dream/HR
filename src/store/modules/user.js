
import { setToken, getToken } from '@/utils/auth'

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
  actions: {}
}
