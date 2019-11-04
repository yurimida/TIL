<template>
<div>
  <div class="description-container" style="background: #0a0a0a; background-size: cover; height: 620px;">
    <v-layout>
      <v-flex xs4>
        <v-img :src="selectedMovie.poster_url" style="max-width: 300px; max-height: 420px; margin: 22% 10% 10% 20%"></v-img>
      </v-flex>
      <v-flex xs8>
        <div style="margin: 10% 10% 10% 0%">
          <h1 style="color: aliceblue; font-weight: 600; font-size: 40px;">
            {{ selectedMovie.title }}
            <a v-bind:href="selectedMovie.trailer" target="_blank" style="text-decoration: none;">
              <v-btn text style="color: aliceblue">Play<v-icon style="color: red">mdi-play</v-icon>
              </v-btn>
            </a>
          </h1>
          <h4>
            <p class="subtitle-tag" style="color: red; font-weight: 600; font-size: 20px;">{{ selectedMovie.genres }}</p>
          </h4>
          <p class="description" style="color: aliceblue; height:310px; overflow-y:scroll;">{{ selectedMovie.movie_summary }}</p>
        </div>
      </v-flex>
    </v-layout>
  </div>
  <div style="background: #0a0a0a; height: 300px">
    <v-layout row style="margin-left: 13%">
      <v-flex xs1 v-for="(matrix, index) in matrixFac">
        <div class="movie-choice img_scale" @click="selectMovie(index)">
          <v-img :src="`${matrix.poster_url}`" class="desktop" height="150px" style="margin-right: 10%; margin-top: 20%; cursor: pointer"></v-img>
        </div>
      </v-flex>
    </v-layout>
  </div>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex";
import api from '@/api'
import NotSubscribe from '../NotSubscribe'

export default {
    components: {
        NotSubscribe
    },
    name: "MainPage",
    data() {
        return {
            matrixFac:null,
            selectedMovie: '',
            dday: '',
        }
    },
    mounted() {
        this.getMatrix();
        this.getUser();
    },
    methods: {
        async postMatrix () {
            const params= {
                id: this.$store.state.currentUser.user_id
            }
            const res = await this.matrix(params);
        },
        ...mapActions("data", ['matrix']),
        ...mapActions("data", ['userDetail']),
        ...mapState({
            movie: state=> state.data.movie,
            UserList: state => state.data.userDetailList,
        }),
        async getMatrix(){
            const params= {
                id: this.$store.state.currentUser.user_id
            }
            const res = await api.getMatrix(params);
            // console.log(res.data)
            this.matrixFac = res.data[0].mf_movie_object
            // console.log(this.matrixFac)
            this.selectedMovie = this.matrixFac[0]
            // console.log(this.selectedMovie)
            // this.selectedMovie.poster = "url('" + this.selectedMovie.poster_url + ")"
        },
        async getUser() {
            const params = {
              id: this.$store.state.currentUser.user_id,
            };
            const res = await api.userDetail(params);
            this.getDday(res.data[0].subscribe);
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

        selectMovie (id) {
          this.selectedMovie = this.matrixFac[id]
          // this.selectedMovie.poster = "url('" + this.selectedMovie.poster_url + ")"
        },
    }
}
</script>
<style>
.img_scale {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transition: all 0.3s ease-in-out;
  /* 부드러운 모션을 위해 추가*/
}

.img_scale:hover {
  transform: scale(1.2);
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
}
  ::-webkit-scrollbar {
    display:none;
}
</style>
