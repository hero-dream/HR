import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data: {
      mobile: '13800000002',
      password: '123456' }
  })
}

export function getInfo(token) {

}

export function logout() {

}
