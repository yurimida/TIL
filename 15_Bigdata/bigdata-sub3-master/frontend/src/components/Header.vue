
<template>
  <v-app-bar id="headerBar" app clipped-left
    :color="headerColor"
    elevation="0"
    >
    <div v-if="user">
      <template v-if="dday > 0">
        <template v-if="ratingCheckedList.length > 0">
          <router-link class="ml-3 mr-5 white--text"
            style="font-size: 20px; text-decoration: none"
            :to="{name:'main'}">
            <v-img src="https://i.imgur.com/OpNML5P.png" style="height: 50px; width:100px;"></v-img>
          </router-link>
        </template>
        <template v-else>
          <router-link class="ml-3 mr-5 white--text"
            style="font-size: 20px; text-decoration: none"
            :to="{name:'rating-page'}">
            <v-img src="https://i.imgur.com/OpNML5P.png" style="height: 50px; width:100px;"></v-img>
          </router-link>
        </template>
      </template>
      <template v-else>
        <router-link class="ml-3 mr-5 white--text"
          style="font-size: 20px; text-decoration: none"
          :to="{name:'notSubscribe'}">
          <v-img src="https://i.imgur.com/OpNML5P.png" style="height: 50px; width:100px;"></v-img>
        </router-link>
      </template>

    </div>
    <div v-else>
      <router-link class="ml-3 mr-5 white--text"
      style="font-size: 20px; text-decoration: none"
      :to="{name:'home'}">
        <v-img src="https://i.imgur.com/OpNML5P.png" style="height: 50px; width:100px;"></v-img>
      </router-link>
    </div>

    <v-spacer />

    <template v-if="windows.width >= 600">
      <div v-if="user">
        <router-link class="ml-3 mr-5 white--text" style="text-decoration: none" :to="{name:'movie-search'}">영화 검색</router-link>
        <router-link class="ml-3 mr-5 white--text" style="text-decoration: none" :to="{name:'rating-page'}">평가 하기</router-link>
        <router-link v-if="UserListt.isAdmin" class="ml-3 mr-5 white--text" style="text-decoration: none" :to="{name:'admin'}">관리자</router-link>
      </div>
    </template>

    <div v-if="user">
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-avatar v-if="UserListt">
              <img :src="UserListt.image">
            </v-avatar>
            <v-avatar v-else>
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img v-if="UserListt.image" :src="UserListt.image"></v-img>
              <v-icon v-else>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ UserListt.username }} 님</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <template v-if="windows.width < 600">
            <v-list-item>
              <v-btn text block :to="{name: 'movie-search'}">
                <v-icon> mdi-magnify </v-icon>
                영화 검색
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text block :to="{name: 'rating-page'}">
                <v-icon> mdi-star </v-icon>
                평점주기
              </v-btn>
            </v-list-item>
            <v-list-item v-if="UserListt.isAdmin">
              <v-btn text block :to="{name: 'admin'}">
                <v-icon> mdi-account-edit </v-icon>
                관리자
              </v-btn>
            </v-list-item>
            <v-divider></v-divider>
          </template>

          <v-list-item>
            <v-btn text block :to="{name: 'user-detail', params: {id: user.user_id}}">
              <v-icon> mdi-account </v-icon>
              개인 정보
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text block :to="{name: 'update-rating'}">
              <v-icon> mdi-movie-edit </v-icon>
              평가한 영화
            </v-btn>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-btn text block @click="logout">
              <v-icon> mdi-logout </v-icon>
              로그아웃
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else>
      <router-link v-if="aa[3]== 'register' " class="white--text" style="text-decoration: none" :to="{name:'login-page'}">LOGIN</router-link>
      <router-link v-else-if="aa[3]=='login' " class="white--text" style="text-decoration: none" :to="{name:'register-page'}">회원가입</router-link>
      <router-link v-else-if="aa[3]=='home'||aa[3]=='' "class="white--text" style="text-decoration: none" :to="{name:'login-page'}">시작하기</router-link>
    </div>

  </v-app-bar>

</template>

<script>
import store from '../store'
import axios from 'axios'
import { mapState, mapActions } from "vuex";
import api from '@/api'
import Register from './Register'
import Swal from 'sweetalert2'
export default {
  components: {
    Register
  },

  data() {
    return {
      userCheck: false,

      dday:'',

      user: "",

      marked: false,
      wait: false,
      isuser: false,
      isAdmin: false,
      UserListt:'',

      headerColor: '',
      isHeader: true,

      aa:'',

      windows: {
        width: 0,
        height: 0
      },
    };
  },
  computed:{
    ...mapState({
      UserList: state => state.data.userDetailList,
      ratingCheckedList: state => state.data.ratingMovieList,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex,
    }),

    currUserCheck(){
      return this.$store.state.currentUser;
    },

  },

  watch: {
    '$route'(to, from) {
      this.currUrl();
      this.setHeaderColor();
      this.randombg();
    },
    async currUserCheck(val){
      this.user = this.$store.state.currentUser;
      const params = {
         id: this.user.user_id
       };
       var res = '없당';
       if(params.id){
         res = await this.userDetail(params);
       }

       console.log("로그인했다 UserList?",this.UserList[0]);
       this.UserListt= this.UserList[0];
       this.getDday(this.UserListt.subscribe)
    }
  },

  mounted() {
    this.user = this.$store.state.currentUser;

    this.currUrl();
    this.setHeaderColor();
    let token = this.$session.get("token")
    if(token){
      this.getUser()
    }
    this.getMovieList();
  },
  methods: {
    ...mapActions("data", ["initRatingMovies"]),
    getMovieList() {
      const params = {
        isRatingUpdatePage: true,
        user_id: this.$store.state.currentUser.user_id
      };
      if(this.$store.state.currentUser){
        this.initRatingMovies(params)
      }
    },

    ...mapActions("data", ['userDetail']),

    test(){
      console.log(this.$store.state.currentUser.user_id);
      console.log(this.ratingCheckedList)
      // console.log("로그아웃했다");
      // this.logout();
      // let token = this.$session.get("token")
      // console.log("토큰없지?",token)
    },
    async test2(){
      // console.log("로그인했다");
      await this.login();
      const params = {
         id: this.user.user_id
       };
       // console.log("로그인했다 유저?",this.user)
      var res = await this.userDetail(params);
      // console.log("로그인했다 돼냐?",res)
      let token = this.$session.get("token")
    },

    /* 2019.10.09 이찬호
    기능 : 현재 페이지에 따라 header 색 바뀜
    영화 검색, 평점주기 페이지에서는 검정, 나머지는 투명
    */
    setHeaderColor(){
      let currPage = window.location.href.split("/")[3];
      this.headerColor= "rgba(0,0,0,0)";
      // if(currPage == "login" || currPage == "register" || currPage == "home" || currPage == "user" || currPage == "main"){
      //   this.headerColor= "rgba(0,0,0,0)";
      // }else{
      //   this.headerColor= "rgba(0,0,0,1)";
      // }
    },

    /* 2019.10.09 이찬호
    기능 : 창 크기에 따라 width, height 값 초기화 해주는 함수
    */
    handleResize() {
      this.windows.width = window.innerWidth;
      this.windows.height = window.innerHeight;
    },


    async login() {
      var credentials = {};
      credentials.username = 'admin';
      credentials.password = 'admin';
      axios.post('http://52.79.194.10:8000/auth/', credentials).then(res => {
        this.$session.start();
        this.$session.set('token', res.data.token);
        this.userCheck = true;
        this.getUser();
      }).catch(e => {
        console.log(e);
      });
    },
    currUrl(){
      this.aa = window.location.href.split("/");
    },
    goTo: function(path) {
      router.push({ name: path });
    },
    getUser() {
      let token = this.$session.get("token")
      // parseJwt
      if(token){
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        this.user = JSON.parse(jsonPayload)
        this.$store.state.currentUser = this.user
        // return JSON.parse(jsonPayload);
      }
    },

    logout() {
      this.$session.start();
      if (this.$session.has("token")) {
        // this.$session.remove("token")
        this.$session.destroy();
        this.userCheck = false;
        this.credentials = {};
        this.$router.push({name:'home'});
        this.$store.state.currentUser = ''
        this.$store.state.movieSearchList.splice(0);
        this.$store.state.movie.splice(0);
        this.$store.state.userDetailList.splice(0);
        this.$store.state.clustersList.splice(0);
        this.$store.state.ratingMovieList.splice(0);
        this.$store.state.ratingCheckedList.splice(0);
        this.$store.state.ratingList.splice(0);
        this.$store.state.user='';
      }
      const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: 'Signed out successfully.'
        })
    },

    /* 작성일 : 2019.10.09
    작성자 : 이찬호
    기능 : StartPage 배경화면을 랜덤으로 골라서 세팅함
    */

    randombg(){
      var random= Math.floor(Math.random() * this.images.length);
      if(this.colIndex.length == 0){
        this.colIndex.push(random);
      }else{
        this.colIndex.push(random);
        this.colIndex.shift();
      }
      this.index = this.colors[this.colIndex[0]];
      document.getElementById('startBackground').style.backgroundImage=this.images[this.colIndex[0]];
    },

    // 2019.10.09 이찬호
    // 날짜 계산하는 함수. 오늘이랑 구독한 날짜 차이 계산해서 dday에 저장
    getDday(subscribe){
      var currentTime = new Date();
      const params= {
        y1 : currentTime.getFullYear(),
        m1 : currentTime.getMonth()+1,
        d1 : currentTime.getDate(),
        y2 : subscribe.substring(0,4),
        m2 : subscribe.substring(5,7),
        d2 : subscribe.substring(8,10),
      }
      this.dday = this.dateDiff(params);
    },
    dateDiff(params) {
      var diffDate_1 =new Date(params.y1, params.m1, params.d1);
      var diffDate_2 =new Date(params.y2, params.m2, params.d2);
      var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
      diff = Math.ceil(diff / (1000 * 3600 * 24));
      return diff;
    },

  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
};
</script>

<style>
.logo {
  width: 40px;
}
</style>
