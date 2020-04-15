import request from '@/utils/request'

export function getArticleList(params) {
  return request({
    url: '/article/pagination',
    method: 'get',
    params
  })
}

export function getHomeArticleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function getArticleRow(params) {
  return request({
    url: '/article/row',
    method: 'get',
    params
  })
}

export function articleSave(data) {
  return request({
    url: '/article/save',
    method: 'post',
    data
  })
}

export function articleDel(data) {
  return request({
    url: '/article/delete',
    method: 'post',
    data
  })
}

export function articleLike(data) {
  return request({
    url: '/article/like',
    method: 'post',
    data
  })
}

