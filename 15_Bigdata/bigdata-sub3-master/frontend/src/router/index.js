import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from '../components/pages/StartPage'
// import MovieListPage from '../components/pages/MovieListPage'
import MovieSearchPage from '../components/pages/MovieSearchPage'
import MovieDetailPage from '../components/pages/MovieDetailPage'
import MovieModifyPage from '../components/pages/MovieAddModifyPage'

import UserDetailPage from '../components/pages/UserDetailPage'
import UserModifyPage from "../components/pages/UserModifyPage";
import UserListPage from '../components/pages/UserListPage'

import TestPage from '../components/NotSubscribe'

import AdminPage from '../components/pages/AdminPage'

import RatingPage from '../components/pages/RatingPage'
import UpdateRatingPage from '../components/pages/UpdateRatingPage'
import MainPage from "../components/pages/MainPage";
import NotSubscribePage from "../components/pages/NotSubscribePage";

import LoginPage from '../components/pages/LoginPage'
import RegisterPage from '../components/pages/RegisterPage'

import NotFoundPage from '../components/pages/NotFoundPage'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/main', component:MainPage,name:'main'},

    { path: '/', component: StartPage, name: 'home' },
    { path: '/home', component: StartPage, name: 'home' },
    { path: '/notSubscribe', component: NotSubscribePage, name: 'notSubscribe' },

    // { path: '/users', component: UserListPage, name: 'users' },
    { path: '/user/:id', component: UserDetailPage, name: 'user-detail', props: true },
    { path: '/user/modify/:id', component: UserModifyPage, name: 'user-modify', props: true },

    // { path: '/movielist', component: MovieListPage, name: 'movie-list' },
    { path: '/movie/:id', component: MovieDetailPage, name: 'movie-detail', props: true },
    { path: '/movies/search', component: MovieSearchPage, name: 'movie-search' },
    { path: '/movieModify/:id', component: MovieModifyPage, name: 'movie-modify', props: true },

    { path: '/rating', component: RatingPage, name: 'rating-page' },
    { path: '/update/rating', component: UpdateRatingPage, name: 'update-rating' },

    { path: '/login', component: LoginPage, name: 'login-page' },
    { path: '/register', component: RegisterPage, name: 'register-page' },

    { path: '/admin', component: AdminPage, name: 'admin' },

    { path: '/test', component: TestPage, name: 'test' },
    { path: '*',     component: NotFoundPage, name:'notfound' },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
