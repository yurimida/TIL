import Vue from 'vue'
import Router from 'vue-router'

// Pages
import WineListPage from '@/components/pages/WineListPage'
import WineDetailPage from '@/components/pages/WineDetailPage'
import CommentPage from '@/components/pages/CommentPage'

import SignInPage from '@/components/pages/SignInPage'
import SignUpPage from '@/components/pages/SignUpPage'
import UserPage from '@/components/pages/UserPage'

import ErrorPage from '@/components/pages/ErrorPage'


// store (vuex-store)
import Store from '@/store';



Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    // Wine
    {
      path: '/',
      name: 'wine-list-page',
      component: WineListPage,
    },
    {
      path: '/wine/:wine_id/',
      name: 'wine-detail-info',
      component: WineDetailPage,
      async beforeEnter(to, from, next) {
        await Store.dispatch('wine/getWineInfo', to.params);
        await Store.dispatch('wine/getWineComments', to.params);
        next();
      }
    },

    // Bixby Comment Page
    {
      path: '/wine/:wine_id/comments/',
      name: 'wine-detail-comments',
      component: CommentPage
    },

    // Authentication
    {
      path: '/account/signIn/',
      name: 'sign-in-page',
      component: SignInPage
    },
    {
      path: '/account/signUp/',
      name: 'sign-up-page',
      component: SignUpPage
    },
    {
      path: '/account/:username/',
      name: 'user-page',
      component: UserPage
    },

    // Error Page
    {
      path: '/error/',
      name: 'error-page',
      component: ErrorPage
    },
  ],
})

// 로그인 정보가 있을 경우 세션스토리지로부터 가져옴.
router.beforeEach((to, from, next) => {
  const sessionStorageKey = 'winery-username';
  const username = sessionStorage.getItem(sessionStorageKey);
  if (username) {
    Store.commit('user/setUserInfo', username);
  } else {
    Store.commit('user/setUserInfo', '');
  }
  next();
})
