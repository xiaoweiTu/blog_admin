import request from '@/utils/request'

export function getSettings(params) {
  return request({
    url: '/web/settings',
    method: 'get',
    params
  })
}

export function getArticleCount(params) {
  return request({
    url: '/web/totalArticles',
    method: 'get',
    params
  })
}

export function getTotalUsers(params) {
  return request({
    url: '/web/totalUsers',
    method: 'get',
    params
  })
}

export function getLikesCount(params) {
  return request({
    url: '/web/totalLikes',
    method: 'get',
    params
  })
}

export function getArticlesInSeven(params) {
  return request({
    url: '/web/articlesSta',
    method: 'get',
    params
  })
}

export function getClickedInSeven(params) {
  return request({
    url: '/web/userSta',
    method: 'get',
    params
  })
}

export function getLikesInSeven(params) {
  return request({
    url: '/web/likesSta',
    method: 'get',
    params
  })
}
