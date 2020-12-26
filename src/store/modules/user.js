
import { setToken as setTokenCookies, getToken } from '@/utils/auth'
import { login, getUserInfo as userInfoRequest, getUserDetailById } from '@/api/user'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    token: getToken(), // 设置初始，放入缓存中
    UserInfo: {}
  },
  mutations: {
    // 修改token的mutations
    // data为页面token
    setToken(state, data) {
      // 方便使用，但是不能持久化
      state.token = data
      // 引入utils文件，用来存放token，不方便，但是持久化
      setTokenCookies(data)
    },
    // 获取用户名
    setUserInfo(state, data) {
      state.UserInfo = data
    }
  },
  // 封装登录请求
  actions: {
    // 第一个login是key值
    // 'login':function () {  }
    login(context, data) {
      // 返回login
      return login(data).then(data => {
        // 因为不在组件，需要单独引入
        // this.$message.success(message)
        Message.success('登录成功')
        // console.log('token=' + data)
        // this.$store.commit('user/setToken', data)
        // 不需要写this，因为在本身操作
        context.commit('setToken', data)
      })
    },
    getUserInfo(context) {
      // 这个获取用户信息的 action, 其实返回一个 api/user 里面封装的请求函数
      return userInfoRequest().then(data => {
        context.commit('setUserInfo', data)
      })
    }
    // 'getUserInfo': async(context) => {
    //   const dataUserInfo = await getUserInfo()
    //   const dataUserDetail = await getUserDetailById()
    //   const UserInfo = {
    //     ...dataUserInfo,
    //     ...dataUserDetail
    //   }
    //   context.commit('setUserInfo', UserInfo)
    // }
  }
}

