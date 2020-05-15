import request from '@/utils/request'

export function getStatus(params) {
  return request({
    url: '/web/status',
    method: 'get',
    params
  })
}

export function getTagType(params) {
  return request({
    url: '/web/tagTypeMapping',
    method: 'get',
    params
  })
}

export function getArticleType(params) {
  return request({
    url: '/web/articleTypeMapping',
    method: 'get',
    params
  })
}
