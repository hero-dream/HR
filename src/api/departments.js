import request from '@/utils/request'

// export const getTments = function() {
//   return request({
//     url: '/company/department'
//   })
// }
export function getTments() {
  return request({
    url: '/company/department',
    method: 'get'

  })
}
