import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/api/tag/list',
    method: 'get',
    params
  })
}

export function getHomeTagList(params) {
  return request({
    url: '/api/home/tag',
    method: 'get',
    params
  })
}

export function getSeriesTagList(params) {
  return request({
    url: '/api/home/tag/series',
    method: 'get',
    params
  })
}

export function tagSave(data) {
  return request({
    url: '/api/tag/save',
    method: 'post',
    data
  })
}

export function tagDel(data) {
  return request({
    url: '/api/tag/delete',
    method: 'post',
    data
  })
}

