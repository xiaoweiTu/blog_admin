import request from '@/utils/request'

export function getSettings(params) {
  return request({
    url: '/api/site/settings',
    method: 'get',
    params
  })
}

export function getFriendLinks(params) {
  return request({
    url: '/api/site/friend_links',
    method: 'get',
    params
  })
}

export function saveFriendLink(data) {
  return request({
    url: '/api/site/save_friend_link',
    method: 'post',
    data
  })
}

export function deleteFriendLink(data) {
  return request({
    url: '/api/site/delete_friend_link',
    method: 'post',
    data
  })
}

export function settingsSave(data) {
  return request({
    url: '/api/site/save',
    method: 'post',
    data
  })
}

