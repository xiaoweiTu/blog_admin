import request from '@/utils/request'

export function getArticleList(params) {
  return request({
    url: '/api/article/list',
    method: 'get',
    params
  })
}

export function getHomeArticleList(params) {
  return request({
    url: '/api/home/article',
    method: 'get',
    params
  })
}

export function getArticleRow(params) {
  return request({
    url: '/api/article/row',
    method: 'get',
    params
  })
}

export function getTags() {
  return request({
    url: '/api/tag/tags',
    method: 'get'
  })
}

export function articleSave(data) {
  return request({
    url: '/api/article/save',
    method: 'post',
    data
  })
}



export function articleDel(data) {
  return request({
    url: '/api/article/delete',
    method: 'post',
    data
  })
}

