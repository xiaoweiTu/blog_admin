const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id: state => state.user.id,
  email: state => state.user.email,
  site_name: state => state.site.site_name,
  site_desc: state => state.site.site_desc,
  site_keyword: state => state.site.site_keyword,
  site_record: state => state.site.site_record,
  site_author: state => state.site.site_author,
  site_icon_url: state => state.site.site_icon_url
}
export default getters
