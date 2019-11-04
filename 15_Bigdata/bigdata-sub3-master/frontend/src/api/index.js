import axios from 'axios'

const apiUrl = '/api';

export default {

  // Moive
  searchMovies(params) {
    return axios.get(`${apiUrl}/movies/`, {
      params,
    })
  },
  deleteMovie(params){
    return axios.delete(`${apiUrl}/movies/`, {
      params,
    })
  },
  modifyMovie(params){
    return axios.post(`${apiUrl}/modifyMovie/`, {
      params,
    })
  },

  // User
  login(params) {
     return axios.post(`${apiUrl}/auth/login/`, {
      params,
    })
  },
  deleteUser(params){
    return axios.delete(`${apiUrl}/auth/signup-many/`, {
      params,
    })
  },
  userDetail(params) {
    return axios.get(`${apiUrl}/auth/signup-many/`, {
      params,
    })
  },
  updateSubscribe(params) {
    return axios.post(`${apiUrl}/auth/update-subscribe/`, {
      params,
    });
  },
  Register(params) {
    return axios.post(`${apiUrl}/auth/signup-many/`, {
      params,
    }).catch(e => {
      return e;
    });
  },
  modifyUser(params){
    return axios.post(`${apiUrl}/auth/modify/`, {
      params,
    })
  },
  setUserGrade(params){
    return axios.post(`${apiUrl}/auth/setUserGrade/`, {
      params,
    })
  },
  setRatings(ratings){
    return axios.post(`${apiUrl}/setRatings/`, {
      ratings,
    });
  },
  getRating(params) {
    return axios.get(`${apiUrl}/ratings/`, {
      params,
    });
  },

  //algoritm
  setAlgorithm(params) {
    return axios.post(`${apiUrl}/clustering/`, {
      params,
    });
  },
  getClustering(params) {
    return axios.get(`${apiUrl}/clustering/`, {
      params,
    });
  },
   matrix(params){
    return axios.post(`${apiUrl}/matrix/`, {
      params,
    });
  },
    getMatrix(params){
    return axios.get(`${apiUrl}/getMatrix/`, {
      params,
    });
  },

}
