import request from '@/utils/request'

export function getTypeMapping() {
  return request({
    url: '/api/status/type_mapping',
    method: 'get'
  })
}

export function getStatusMapping() {
  return request({
    url: '/api/status/status_mapping',
    method: 'get'
  })
}

