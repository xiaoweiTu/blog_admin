import request from '@/utils/request'

export function getSettings(params) {
  return request({
    url: '/api/site/settings',
    method: 'get',
    params
  })
}

export function settingsSave(data) {
  return request({
    url: '/api/site/save',
    method: 'post',
    data
  })
}

