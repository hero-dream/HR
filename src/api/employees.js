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
// 添加
export function addEmployee(data) {
  return request({
    url: `/sys/user`,
    method: 'post',
    data

  })
}

// 导入
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
