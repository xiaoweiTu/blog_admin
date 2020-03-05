import { getSettings } from '../../api/site'

const state = {
  site_name: '',
  site_desc: '',
  site_owner: '',
  site_notice: '',
  site_record: '',
  site_icon_url: ''
}

const mutations = {
  set_site_name(state, site_name) {
    state.site_name = site_name
  },
  set_site_desc(state, site_desc) {
    state.site_desc = site_desc
  },
  set_site_owner(state, site_owner) {
    state.site_owner = site_owner
  },
  set_site_notice(state, site_notice) {
    state.site_notice = site_notice
  },
  set_site_record(state, site_record) {
    state.site_record = site_record
  },
  set_site_icon_url(state, site_icon_url) {
    state.site_icon_url = site_icon_url
  }
}

const actions = {
  getHomeSettings({ commit }) {
    return new Promise((resolve, reject) => {
      getSettings().then(({ code, data }) => {
        if (code === 1) {
          commit('set_site_name', data.site_name)
          commit('set_site_desc', data.site_desc)
          commit('set_site_owner', data.site_owner)
          commit('set_site_notice', data.site_notice)
          commit('set_site_record', data.site_record)
          commit('set_site_icon_url', data.site_icon_url)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
