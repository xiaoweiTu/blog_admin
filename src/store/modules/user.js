import { login, userLogin, userRegister, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    email: '',
    is_admin: 0,
    id: '',
    last_login: '',
    last_ip_address: '',
    verify_at: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_IS_ADMIN: (state, is_admin) => {
    state.is_admin = is_admin
  },
  SET_LAST_LOGIN: (state, last_login) => {
    state.last_login = last_login
  },
  SET_LAST_IP_ADDRESS: (state, last_ip_address) => {
    state.last_ip_address = last_ip_address
  },
  SET_VERIFY_AT: (state, verifyAt) => {
    state.verify_at = verifyAt
  }
}

const actions = {
  // admin login
  adminLogin({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
        const { code, data, msg } = response
        if (code === 1) {
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.user.name)
          commit('SET_EMAIL', data.user.email)
          commit('SET_ID', data.user.id)
          commit('SET_IS_ADMIN', data.user.is_admin)
          commit('SET_LAST_LOGIN', data.user.last_login)
          commit('SET_LAST_IP_ADDRESS', data.user.last_ip_address)
          commit('SET_VERIFY_AT', data.user.verify_at)
          setToken(data.token)
        } else {
          throw new Error(msg)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  userLogin({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      userLogin({ email: email.trim(), password: password }).then(response => {
        const { code, data, msg } = response
        if (code === 1) {
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.user.name)
          commit('SET_EMAIL', data.user.email)
          commit('SET_ID', data.user.id)
          commit('SET_IS_ADMIN', data.user.is_admin)
          commit('SET_LAST_LOGIN', data.user.last_login)
          commit('SET_LAST_IP_ADDRESS', data.user.last_ip_address)
          commit('SET_VERIFY_AT', data.user.verify_at)
          setToken(data.token)
        } else {
          throw new Error(msg)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  userRegister({ commit }, userInfo) {
    const { email, password, name } = userInfo
    return new Promise((resolve, reject) => {
      userRegister({ email: email.trim(), password: password, name: name }).then(response => {
        const { code, data, msg } = response
        if (code === 1) {
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.user.name)
          commit('SET_EMAIL', data.user.email)
          commit('SET_ID', data.user.id)
          commit('SET_IS_ADMIN', data.user.is_admin)
          commit('SET_VERIFY_AT', data.user.verify_at)
          setToken(data.token)
        } else {
          throw new Error(msg)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { name, id, email, is_admin, last_login, last_ip_address,verify_at } = response.data
        commit('SET_NAME', name)
        commit('SET_ID', id)
        commit('SET_EMAIL', email)
        commit('SET_IS_ADMIN', is_admin)
        commit('SET_LAST_LOGIN', last_login)
        commit('SET_LAST_IP_ADDRESS', last_ip_address)
        commit('SET_VERIFY_AT', verify_at)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

