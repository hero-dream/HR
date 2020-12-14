import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role/',
    method: 'get',
    params
    // params是查询参数，里面需要携带分页信息
  })
}

