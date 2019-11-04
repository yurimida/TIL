import api from "../../api";
import { sortingList } from '../../mixins/sortingList';

/*
  < State >
  - 와인 리스트 페이지
  numWines: 와인 총 개수 
  wineList: 모든 와인들에 대한 정보 

  - 와인 상세 페이지
  wineInfo: 특정 와인에 대한 정보 
  wineComments : 특정 와인에 대한 댓글 정보
*/
const state = {
  numWines: 0,
  wineList: [],
  wineInfo: {},
  wineComments: [],
};


/*
  < Getters >
  - 와인 리스트 페이지
  numWines: 와인 총 개수
  wineList: 와인들 정보
*/
const getters = {

};


/*
  < Mutations >
  - 와인 리스트 페이지
  setNumWines: 와인 총 개수 초기화
  setWineList: 모든 와인들에 대한 정보 초기화
  sortingWineList : 와인을 특정 기준으로 정렬

  - 와인 상세 페이지
  setWineInfo: 특정 와인에 대한 정보 초기화
  setWineComments: 특정 와인의 댓글 정보 초기화
*/
const mutations = {
  setNumWines(state, number) {
    state.numWines = number;
  },
  
  setWineList(state, wineList) {
    state.wineList = wineList;
  },

  sortingWineList(state, params) {
    state.wineList = sortingList(String(params.key), params.order, state.wineList);
  },

  setWineInfo(state, wineInfo) {
    state.wineInfo = wineInfo;
  },

  setWineComments(state, wineComments) {
    state.wineComments = wineComments;
  }
};


/*
  < Actions >
  getWineList : 모든 혹은 조건에 맞는 와인에 대한 정보를 가져옴.
  getWineInfo : 특정 와인에 대한 정보를 가져옴.
  getWineComments : 특정 와인에 대한 댓글 정보를 가져옴.
*/
const actions = {
  async getWineList({ commit }, params) {
    try {
      const response = await api.getWineList(params);
      commit('setNumWines', response.data.count);
      commit('setWineList', response.data.wine);
    } catch(error) {
      console.log(error);
    }
  },
  async getWineInfo({ commit }, params) {
    try {
      const response = await api.getWineInfo(params);
      commit('setWineInfo', response.data.wine[0]);
    } catch(error) {
      console.log(error);
    }
  },
  async getWineComments({ commit }, params) {
    try {
      const response = await api.getWineComments(params);
      commit('setWineComments', response.data);
    } catch(error) {
      console.log(error);
    }
  }
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
