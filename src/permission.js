import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const homeList = ['home', 'homeArticle', 'adminLogin', 'userLogin', 'userRegister'] // 不需要登录
const adminList = ['dashboard', 'TagList', 'ArticleList', 'EditArticle'] // 管理员可以进入

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    // 获取该用户信息
    const hasGetUserInfo = store.getters.name
    let isAdmin = store.getters.is_admin
    if (hasGetUserInfo) {
      // 管理员随意
      if (isAdmin) {
        if (to.path === '/admin/login') {
          // if is logged in, redirect to the home page
          next({ path: '/admin' })
        } else {
          // in the free login whitelist, go directly
          next()
        }
      } else {
        if (to.path === '/user/login' || to.path === '/user/register' || adminList.indexOf(to.name) !== -1) {
          next({ path: '/' })
        } else {
          next()
        }
      }
      NProgress.done()
    } else {
      try {
        // get user info
        await store.dispatch('user/getInfo')
        isAdmin = store.getters.is_admin
        if (isAdmin) {
          next()
        } else {
          if (adminList.indexOf(to.name) !== -1) {
            // 跳转到首页
            next({ path: '/' })
          } else {
            // 如果是去登录或注册则直接去首页
            if (to.path === '/user/login' || to.path === '/user/register') {
              next({ path: '/' })
            } else {
              next()
            }
          }
          NProgress.done()
        }
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        if (homeList.indexOf(to.name) !== -1) {
          next()
        } else {
          Message.error(error || 'Has Error')
          next(`/user/login?redirect=${to.path}`)
        }
        NProgress.done()
      }
    }
  } else {
    /* has no token*/
    store.commit('user/RESET_STATE')
    if (homeList.indexOf(to.name) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      if (to.path === '/admin/login') {
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/user/login?redirect=${to.path}`)
      }
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
