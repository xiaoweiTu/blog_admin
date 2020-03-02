import request from '@/utils/request'

export function getCourseList(params) {
  return request({
    url: '/api/course/list',
    method: 'get',
    params
  })
}

