import request from '@/utils/request'

export function getTments() {
  return request({
    url: '/company/department',
    method: 'get'

  })
}
