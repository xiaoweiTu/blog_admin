import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import HomeLayout from '@/homeLayout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/admin/login',
    component: () => import('@/views/admin/login/index'),
    name: 'adminLogin',
    hidden: true
  },
  {
    path: '/user/login',
    name: 'userLogin',
    component: () => import('@/views/home/login/index'),
    hidden: true
  },
  {
    path: '/user/register',
    name: 'userRegister',
    component: () => import('@/views/home/login/register'),
    hidden: true
  },
  {
    path: '/user/find-pass',
    name: 'userFindPass',
    component: () => import('@/views/home/login/find-pass'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: HomeLayout,
    redirect: '/home',
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index/index'),
        meta: { title: '首页', icon: 'dashboard' },
        hidden: true
      },
      {
        path: '/article/:article_id',
        name: 'homeArticle',
        component: () => import('@/views/home/article/index'),
        meta: { title: '文章', icon: 'book' },
        hidden: true
      },
      {
        path: '/home/user',
        name: 'homeUser',
        component: () => import('@/views/home/user/index'),
        meta: { title: '个人中心', icon: 'people' },
        hidden: true
      },
      {
        path: '/home/talks',
        name: 'homeTalks',
        component: () => import('@/views/home/talks/index'),
        meta: { title: '留言', icon: 'people' },
        hidden: true
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [{
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import('@/views/admin/dashboard/index'),
      meta: { title: '看板', icon: 'dashboard' }
    }]
  },

  // 用户管理
  {
    path: '/admin/user',
    component: Layout,
    children: [
      {
        path: '/admin/user/list',
        name: 'userList',
        component: () => import('@/views/admin/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  // 标签管理
  {
    path: '/admin/tag',
    component: Layout,
    children: [
      {
        path: '/admin/tag/list',
        name: 'TagList',
        component: () => import('@/views/admin/tag/index'),
        meta: { title: '标签管理', icon: 'table' }
      }
    ]
  },
  // 文章管理
  {
    path: '/admin/article',
    component: Layout,
    redirect: '/admin/article/list',
    children: [
      {
        path: '/admin/article/list',
        name: 'ArticleList',
        component: () => import('@/views/admin/article/index'),
        meta: { title: '文章列表', icon: 'form' }
      },
      {
        path: '/admin/article/edit',
        name: 'EditArticle',
        hidden: true,
        component: () => import('@/views/admin/article/editArticle'),
        meta: { title: '文章编辑', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
