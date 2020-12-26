
import { setToken as setTokenCookies, getToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
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
    'getUserInfo': async(context) => {
      // 发送用户基本信息
      const dataUserInfo = await getUserInfo()
      const dataUserDetail = await getUserDetailById(dataUserInfo.userId)
      const UserInfo = {
        ...dataUserInfo,
        ...dataUserDetail
      }
      context.commit('setUserInfo', UserInfo)
      console.log(UserInfo)
    }

  }
}

