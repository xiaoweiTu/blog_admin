import request from '@/utils/request'

export function getStatus(params) {
  return request({
    url: '/web/status',
    method: 'get',
    params
  })
}

export function getType(params) {
  return request({
    url: '/web/type',
    method: 'get',
    params
  })
}
