import { getSettings } from '../../api/site'

const state = {
  site_name: '',
  site_desc: '',
  site_keyword: '',
  site_author: '',
  site_record: '',
  site_icon_url: '',
  site_who: ''
}

const mutations = {
  set_site_name(state, site_name) {
    state.site_name = site_name
  },
  set_site_desc(state, site_desc) {
    state.site_desc = site_desc
  },
  set_site_keyword(state, site_keyword) {
    state.site_keyword = site_keyword
  },
  set_site_author(state, site_author) {
    state.site_author = site_author
  },
  set_site_record(state, site_record) {
    state.site_record = site_record
  },
  set_site_icon_url(state, site_icon_url) {
    state.site_icon_url = site_icon_url
  },
  set_site_who(state, who) {
    state.site_who = who
  }
}

const actions = {
  getHomeSettings({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.site_name === '') {
        getSettings().then(({ code, data }) => {
          if (code === 1) {
            commit('set_site_name', data.web_name)
            commit('set_site_desc', data.web_desc)
            commit('set_site_author', data.web_author)
            commit('set_site_record', data.web_record)
            commit('set_site_icon_url', data.web_icon)
            commit('set_site_keyword', data.web_keyword)
            commit('set_site_who', data.web_who)
            document.title = data.web_name
            document.getElementById('site-icon').setAttribute('href', data.web_icon)
            document.getElementById('site-author').content = data.web_author
            document.getElementById('site-desc').content = data.web_desc
            document.getElementById('site-keywords').content = data.web_keyword
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
