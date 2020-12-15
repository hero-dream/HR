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

// * 修改角色
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

//  * 获取角色详情

export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 公司信息
export function getCompanyInfo(companyId) {
  return request({
    url: `/sys/role/${companyId}`
  })
}

