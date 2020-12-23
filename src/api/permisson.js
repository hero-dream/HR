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
    method: 'post',
    url: '/sys/permission',
    data
  })
}
// export function addPermission(data) {
//   return request({
//     url: '/sys/permission',
//     method: 'post',
//     data
//   })
// }

// 根据id删除权限点
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

// 根据ID获取权限点详情
export function getPermissionDetail(id) {
  return request({
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
