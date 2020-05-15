import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/admin_login',
    method: 'post',
    data
  })
}

export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function userRegister(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function userList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}
export function likeHistory(params) {
  return request({
    url: '/user/likeHistory',
    method: 'get',
    params
  })
}

export function talkList(params) {
  return request({
    url: '/user/talkList',
    method: 'get',
    params
  })
}

export function edit(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function talk(data) {
  return request({
    url: '/user/talk',
    method: 'post',
    data
  })
}

export function deleteTalk(data) {
  return request({
    url: '/user/deleteTalk',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/out',
    method: 'post'
  })
}
