import request from '@/utils/request'

// 获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 删除功能
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'

  })
}
