import request from '@/utils/request'

// export const getTments = function() {
//   return request({
//     url: '/company/department'
//   })
// }
// 公司员工
export function getTments() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}
