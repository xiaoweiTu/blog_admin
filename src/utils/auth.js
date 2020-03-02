import Cookies from 'js-cookie'

const TokenKey = 'admin_token'
const adminInfoKey = 'admin_info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAdminInfo(info) {
  return window.localStorage.setItem(adminInfoKey, JSON.stringify(info))
}

export function removeAdminInfo() {
  return window.localStorage.removeItem(adminInfoKey)
}

export function getAdminInfo() {
  return JSON.parse(window.localStorage.getItem(adminInfoKey))
}
