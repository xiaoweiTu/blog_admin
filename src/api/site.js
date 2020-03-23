import request from '@/utils/request'

export function getSettings(params) {
  return request({
    url: '/web/settings',
    method: 'get',
    params
  })
}
