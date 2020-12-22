import request from '@/utils/request'
// 获取所有权限点
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

// 添加权限点
export function addPermissionList(data) {
  return request({
    Method: 'POST',
    url: '/sys/permission',
    data
  })
}

// 根据id删除权限点
export function delPermissionList(id) {
  return request({
    Method: 'DELETE',
    url: `/sys/permission/${id}`

  })
}

// 根据ID获取权限点详情
export function getPermissionDetail(id) {
  return request({
    Method: 'GET',
    url: `/sys/permission/${id}`

  })
}

// 更新权限
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
