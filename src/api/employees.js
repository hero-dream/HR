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

// 保存员工的基本信息

export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

//  读取用户详情的基础信息

export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

//  更新用户详情的基础信息

export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取用户的岗位信息

export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// 保存岗位信息

export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 给用户分配角色

export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
