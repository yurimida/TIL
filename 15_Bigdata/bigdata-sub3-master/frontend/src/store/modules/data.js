import api from '@/api'

// initial state
const state = {
  // shape: [{ id, title, genres, viewCnt, rating }]
  movieSearchList: [],
  movie: [],
  adminMovie: [],
  userDetailList: [],
  userList: [],
  profiles: [],

  clustersList: [],

  ratingMovieList:[],
  ratingCheckedList:[],
  ratingList:[],

  currentUser:'',
  user:'',

  searchInput:'',

  colIndex : [],
  colors :["#EA8827",
           "primary",
           "#A32634",
           "#B97922",
           "#D77AAF",
           "#552EBF",
           "#00f09c",],
  images :[
    'url(https://i.imgur.com/WiBTxG7.jpg)', // 알라딘
    'url(https://i.imgur.com/CjF6v49.jpg)', // 엘사
    'url(https://i.imgur.com/GEYrJzt.jpg)', // 아이언맨
    'url(https://i.imgur.com/EVIprSp.jpg)', // 라이온킹
    'url(https://i.imgur.com/bxSklLd.jpg)', // 토이스토리
    'url(https://i.imgur.com/H3L0HJo.jpg)', // 라라랜드
    'url(https://i.imgur.com/McUhTGQ.jpg)', // 라이프 오브 파이
  ]

}

// actions
const actions = {
  async initRatingMovies({commit}, params){
    const resp = await api.searchMovies(params)
    const movies = resp.data.map(d => ({
      id: d.id,
      title: d.title,
      genres: d.genres_array,
      viewCnt: d.view_cnt,
      watchCnt: d.watch_cnt,
      rating: 0.0,
      users: d.user_username,
      userid: d.user,
      summary: d.movie_summary,
      poster: d.poster_url,
    }))

    commit('setRatingMovieList', movies)
  },
  async searchMovies({ commit }, params) {
    const resp = await api.searchMovies(params)
    const movies = resp.data.map(d => ({
      id: d.id,
      title: d.title,
      genres: d.genres_array,
      viewCnt: d.view_cnt,
      watchCnt: d.watch_cnt,
      rating: d.average_rating,
      users: d.user_username,
      userid: d.user,
      summary: d.movie_summary,
      poster: d.poster_url,
      trailer:d.trailer,
    }))
    if (params.id) {
      commit('setMovie', movies)
    }
    else {
      commit('setMovieSearchList', movies)
      commit('setAdminMovie', movies)
    }
  },
  async deleteMovie({ commit }, params) {
    const resp = await api.deleteMovie(params)
  },
  async modifyMovie({ commit }, params) {
    const resp = await api.modifyMovie(params)
  },
  async deleteUser({ commit }, params) {
    const resp = await api.deleteUser(params)
  },
  async userDetail({commit}, params) {
    const res = await api.userDetail(params)
    const profiles = res.data.map(d => ({
      id: d.id,
      username: d.username,
      gender: d.gender,
      age: d.age,
      isAdmin: d.is_staff,
      occupation: d.occupation,
      movies: d.movies,
      image: d.image,
      clustering: d.clustering,
      subscribe: d.subscribe,
    }))
    if (params.id) {
      commit('setUserDetailList', profiles)
    }
    else {
      commit('setUserList', profiles)
    }
  },
  async Register({commit}, params) {
    return await api.Register(params);
  },
  async getClustering({commit}, params) {
    const res = await api.getClustering(params);
    console.log(res,'res')
    console.log(params,'params')
    const clusters = res.data.map(d =>({
      movie_label: d.movie_label,
      movie_cluster: d.movie_cluster,
      user_label: d.user_label,
      user_cluster: d.user_cluster
    }));
    commit('setClusterList', clusters)
  },

  async setRatings({commit},params){
    await api.setRatings(params);
  },
  async setUserGrade({commit},params){
    await api.setUserGrade(params);
  },
  async getRating({commit}, params) {

    const res = await api.getRating(params);
    const ratings = res.data.map(d => ({
      id: d.id,
      movie_id: d.movie_id,
      poster: d.movie_poster,
      title: d.movie_title,
      user_id: d.user_id,
      rating: d.rating,
      timestamp: d.timestamp,
    }));
    commit('getRatingList', ratings)
  },
  async matrix({ commit }, params) {
    const resp = await api.matrix(params)
    // console.log(resp)
  },

};

// mutations
const mutations = {
  setRatingMovieList(state, movies){
    state.ratingMovieList = movies.map(m => m)
  },
  setMovieSearchList(state, movies) {
    state.movieSearchList = movies.map(m => m)
  },
  setMovie(state, movies) {
    state.movie = movies.map(m => m)
  },
  setAdminMovie(state, movies) {
    state.adminMovie = movies.map(m => m)
  },
  setUserDetailList(state, profiles) {
    state.userDetailList = profiles.map(m => m)
  },
  setUserList(state, profiles) {
    state.userList = profiles.map(m => m)
  },
  setRegisterList(state, profiles) {
    state.profiles = profiles.map(m => m)
  },
  setClusterList(state, clusters) {
    state.clustersList = clusters.map(m => m)
  },
  getRatingList(state, ratings) {
    state.ratingList = ratings.map(m => m)
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
