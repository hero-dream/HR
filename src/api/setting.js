import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role/',
    method: 'get',
    params
    // params是查询参数，里面需要携带分页信息
  })
}
// 删除
export function delRole(roleId) {
  return request({
    url: '/sys/role/' + roleId,
    method: 'delete'
  })
}

// 新增
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data

  })
}

