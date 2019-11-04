import axios from "axios";

const API_URL = "http://localhost:8000/api";
const ACCOUNT_URL = "http://localhost:8000/accounts"
const headers = {'content-type': 'application/json'}

export default {

  // WINE API
  getWineList(params) {
    return axios.get(`${API_URL}/wine_list/`, { params });
  },
  getWineInfo(params) {
    return axios.get(`${API_URL}/wine_detail_info/${params['wine_id']}`);
  },


  // ACCOUNT API
  signUp(params) {
    return axios.post(`${ACCOUNT_URL}/sign_up/`, params);
  },
  signIn(params) {
    return axios.post(`${ACCOUNT_URL}/sign_in/`, params);
  },
  signOut(params) {
    return axios.post(`${ACCOUNT_URL}/sign_out/`, params);
  },
  searchUser(username) {
    return axios.get(`${ACCOUNT_URL}/search_user/${username}/`);
  },


  // COMMENT API
  getWineComments(params) {
    return axios.get(`${API_URL}/comments/${params['wine_id']}`);
  },
  createComment(params) {
    return axios.post(`${API_URL}/comment/`, params);
  },
  deleteComment(params) {
    return axios.delete(`${API_URL}/comment/`, { data: params });
  }
}
