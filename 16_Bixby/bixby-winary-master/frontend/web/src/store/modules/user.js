import api from "../../api"

// username을 세션스토리지에 저장할 때 사용하는 Key값
const sessionStorageKey = 'winery-username';



/*
  < State >
  username : 인증된 사용자의 유저명, 새로고침에 의해 휘발되지 않도록 세션스토리지에도 저장됨.
  isSigned : 사용자의 인증여부를 나타내는 변수
*/
const state = {
  username: '',
  isSigned: false
};


/*
  < Getters >
*/
const getters = {

};


/*
  < Mutations >
  setUserInfo : username에 따라 signIn, signOut 상태로 초기화
*/
const mutations = {
  // SignIn, SignOut 처리
  setUserInfo(state, username) {
    state.username = username;
    if (username) {
      state.isSigned = true;
    } else {
      state.isSigned = false;
    }
  }
};


/*
  < Actions >
  - Authentication
  signUp : 회원가입
  signIn : 로그인
  signOut : 로그아웃
  searchUser : 중복유저 유무 확인(회원가입 시)

  - Comment
  createComment : 유저의 와인에 대한 댓글 생성 / 갱신
  deleteComment : 유저의 와인에 대한 댓글 삭제
*/
const actions = {
  async signUp({ commit }, params) {
    try {
      const response = await api.signUp(params);
      console.log(response);
      return response.status;
    } catch(error) {
      console.log(error);
      return 400;
    }
  },

  async signIn({ commit }, params) {
    try {
      const response = await api.signIn(params);
      const username = response.data.username;
      sessionStorage.setItem(sessionStorageKey, username);
      commit('setUserInfo', username);
      return response.status;
    } catch(error) {
      return 401;
    }
  },

  async signOut({ state, commit }) {
    try {
      const params = {
        username: state.username
      }
      const response = await api.signOut(params);
      sessionStorage.removeItem(sessionStorageKey);
      commit('setUserInfo', '');
      return response.status;
    } catch(error) {
      console.log(error);
      return 403;
    }
  },

  async searchUser({ commit }, username) {
    try {
      const response = await api.searchUser(username);
      return response.data.response;
    } catch(error) {
      console.log(error);
      return
    }
  },

  async createComment({ commit, rootState }, params) {
    try {
      const response = await api.createComment(params);
      // const wineComments = rootState.wine.wineComments;
      // wineComments.push(response.data);

      commit('wine/setWineComments', response.data, { root: true });
      return response.status;
    } catch(error) {
      console.log(error);
      return 400
    }
  },

  async deleteComment({ commit }, params) {
    try {
      const response = await api.deleteComment(params);
      commit('wine/setWineComments', response.data, { root: true });
      return response.status;
    } catch(error) {
      console.log(error);
      return 400
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
