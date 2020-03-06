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
  site_notice: state => state.site.site_notice,
  site_record: state => state.site.site_record,
  site_owner: state => state.site.site_owner,
  site_icon_url: state => state.site.site_icon_url,
  site_owner_desc: state => state.site.site_owner_desc
}
export default getters
