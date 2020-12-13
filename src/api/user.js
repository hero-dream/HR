import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data: data
  })
}
// 获取用户基本资料
export function getUserInfo(token) {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}
//
export function logout() {

}
