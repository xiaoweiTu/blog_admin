import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/tag/pagination',
    method: 'get',
    params
  })
}

export function getHomeTagList(params) {
  return request({
    url: '/tag/list',
    method: 'get',
    params
  })
}

export function getParentTags(params) {
  return request({
    url: '/tag/parent',
    method: 'get',
    params
  })
}

export function getAllTags(params) {
  return request({
    url: '/tag/all',
    method: 'get',
    params
  })
}

export function tagSave(data) {
  return request({
    url: '/tag/save',
    method: 'post',
    data
  })
}

export function tagDel(data) {
  return request({
    url: '/tag/delete',
    method: 'post',
    data
  })
}

