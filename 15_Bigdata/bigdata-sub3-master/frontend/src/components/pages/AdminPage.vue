<template>
<v-container>
  <v-layout wrap text-xs-center style="margin: 7% 7% 7% 5%">
    <v-container>
      <v-flex xs12 text-xs-center>
        <v-text-field solo label="Search" v-model="search"></v-text-field>
      </v-flex>

      <v-card min-height="650px">
        <v-tabs v-model="tab" centered
          icons-and-text
          transition="fade-transition"
           fixed-tabs
           :color="index">
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            Users ({{userSearchList.length}})
            <v-icon size=17>mdi-account-circle</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Movies ({{movieSearchList.length}})
            <v-icon size=17>mdi-movie</v-icon>
          </v-tab>

          <v-tab href="#tab-3">
            Algorithms
            <v-icon size=17>mdi-filter</v-icon>
          </v-tab>

        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :value="'tab-'+1" transition="fade-transition" reverse-transition="fade-transition">
            <v-card flat>
              <v-flex xs12 text-xs-center>
                <v-data-table :headers="headers" :items="userSearchList" class="elevation-1">
                  <template v-slot:item.username="props">
                    <div :return-value.sync="props.item.username">
                      <router-link v-if="props.item.subTitle" :to="{name:'user-detail', params:{id:props.item.id}}" style="text-decoration: none;">
                        <span style="color:black" v-html="highlight(props.item.subTitle,search)"></span>
                      </router-link>
                      <router-link v-else :to="{name:'user-detail', params:{id:props.item.id}}" style="text-decoration: none;">
                        <span style="color:black" v-html="highlight(props.item.username,search)"></span>
                      </router-link>
                    </div>
                  </template>
                  <template v-slot:item.occupation="props">
                    <span style="color:black" v-html="highlight(props.item.occupation,search)"></span>
                  </template>
                  <template v-slot:item.isStaff="props">
                    <v-flex text-xs-center>
                      <v-checkbox :color="index" v-model="props.item.isAdmin" @input="setUserGradeAction(props.item)" @change="setUserGradeAction(props.item)" />
                    </v-flex>
                  </template>
                  <template v-slot:item.action="props">
                    <v-btn fab text small color="orange" :to="{name:'user-modify', params:{id:props.item.id}}">
                      <v-icon size="17">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn fab text small color="red" v-on:click="deleteUser(props.item.id);deleteUserInSearchList(props.item.id)">
                      <v-icon size="17">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-flex>
            </v-card>
          </v-tab-item>


          <v-tab-item :value="'tab-'+2" transition="fade-transition" reverse-transition="fade-transition">
            <v-card flat>
              <v-flex xs12 text-xs-center>
                <v-data-table :headers="movieHeaders" :items="movieSearchList" class="elevation-1">
                  <template v-slot:item.title="props">
                    <div :return-value.sync="props.item.title">
                      <router-link v-if="props.item.subTitle" :to="{name:'movie-detail', params:{id:props.item.id}}" style="text-decoration: none;">
                        <span style="color:black" v-html="highlight(props.item.subTitle,search)"></span>
                      </router-link>
                      <router-link v-else :to="{name:'movie-detail', params:{id:props.item.id}}" style="text-decoration: none;">
                        <span style="color:black" v-html="highlight(props.item.title,search)"></span>
                      </router-link>
                    </div>
                  </template>
                  <template v-slot:item.genres="props">
                    <span style="color:black" v-html="highlight(props.item.genres,search)"></span>
                  </template>
                  <template v-slot:item.rating="props">
                    <v-chip :color="getColor(props.item.rating)" dark>{{ props.item.rating }}</v-chip>
                  </template>
                  <template v-slot:item.action="props">
                    <v-btn fab text small color="orange" :to="{name:'movie-modify', params:{id:props.item.id}}">
                      <v-icon size="17">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn fab text small color="red" v-on:click="deleteMovie(props.item.id);deleteMovieInSearchList(props.item.id)">
                      <v-icon size="17">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-flex>
            </v-card>
          </v-tab-item>

          <v-tab-item :value="'tab-'+3" transition="fade-transition" reverse-transition="fade-transition">
            <v-card flat min-height="650px">
              <v-flex xs12 text-xs-center mx-5>
                <v-layout align-center>
                  <v-flex text-xs-12 text-xs-center>
                    <v-layout>
                      <h3 style="color:#696969;">Movie / User</h3>
                      <v-radio-group v-model="target" row>
                        <v-radio label="Movie" value="movie" />
                        <v-radio label="User" value="user" />
                      </v-radio-group>
                    </v-layout>
                    <h3 style="color:#696969;">Choose Algorithm</h3>
                    <v-layout align-center style="margin: auto">
                      <v-radio-group v-model="algorithms" row>
                        <v-radio label="Kmeans" color="red" value="Kmeans" />
                        <v-radio label="Hierarchical" color="orange" value="Hierarchical" />
                        <v-radio v-if="target=='movie'" label="EM" color="info" value="EM" />
                        <v-radio v-if="target=='movie'" label="KNN" color="info" value="KNN" />
                      </v-radio-group>
                    </v-layout>
                    <template v-if="algorithms=='Kmeans'">
                      <h1>{{ KmeanSlider }}</h1>
                      <span> Cluster </span>
                      <v-slider v-model="KmeanSlider" max="10" thumb-label="always" />
                    </template>
                    <template v-else-if="algorithms=='Hierarchical'">
                      <h1>{{ HierarchicalSlider }}</h1>
                      <span> Cluster </span>
                      <v-slider v-model="HierarchicalSlider" max="10" thumb-label="always" />
                    </template>
                    <template v-else-if="algorithms=='EM'">
                      <h1>{{ EMSlider }}</h1>
                      <span> Cluster </span>
                      <v-slider v-model="EMSlider" max="20" thumb-label="always" />
                    </template>
                    <template v-else-if="algorithms=='KNN'">
                      <h1>{{ KNNSlider }}</h1>
                      <span> Cluster </span>
                      <v-slider v-model="KNNSlider" max="20" thumb-label="always" />
                    </template>
                    <v-layout align-center>
                      <v-btn @click="setAlgorithm"> 새로 세팅하기 </v-btn>
                    </v-layout>
                    <div class="vld-parent">
                      <loading :active.sync="isLoading" :is-full-page="true" color="#A4403D" background-color="#4b4b4b" :height="100" :width="100" />
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-layout>
</v-container>
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex";
import router from '../../router'
import api from '@/api'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'

export default {
  components: {
    Loading
  },
  data() {
    return {
      // color data
      index:'',

      // admin login
      isAdmin: false,

      // Tab Data
      tab: null,

      // users Data
      user: '',
      headers: [{
          text: 'Username',
          align: 'left',
          sortable: false,
          value: 'username',
          align: 'center',
        },
        {
          text: 'gender',
          value: 'gender',
          align: 'center',
        },
        {
          text: 'age',
          value: 'age',
          align: 'center'
        },
        {
          text: 'occupation',
          value: 'occupation',
          align: 'center',
        },
        {
          text: 'isStaff',
          value: 'isStaff',
          align: 'center',
        },
        {
          text: 'Action',
          value: 'action',
          align: 'center',
          sortable: false
        },
      ],

      // Movie data
      movieHeaders: [{
          text: 'Title',
          align: 'center',
          sortable: false,
          value: 'title',
          align: 'center'
        },
        {
          text: 'Genres',
          value: 'genres',
          align: 'center'
        },
        {
          text: 'Rating',
          value: 'rating',
          align: 'center'
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false,
          align: 'center'
        },
      ],

      // Search Data
      search: '',
      userSearchList: [],
      movieSearchList: [],

      // Algorithms
      KmeanSlider: 0,
      HierarchicalSlider: 0,
      EMSlider: 0,
      KNNSlider: 0,
      target: 'movie',
      algorithms: "Kmeans",
      cluster: {},

      isLoading: false,
      height: 150,
    }
  },
  // 로딩 이쁜거야
  computed: {
    ...mapState({
      UserList: state => state.data.userList,
      movieList: state => state.data.adminMovie,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex
    }),
    getColIndex(){
      this.index = this.colors[this.colIndex[0]];
      return this.$store.state.colIndex;
    },
  },
  watch: {
    getColIndex(){

    },
    movieList() {
      this.searchInit();
    },
    UserList() {
      this.searchInit()
    },
    target() {
      if (this.target === 'movie') {
        if (this.cluster.movie_cluster === 'Kmeans') {
          this.algorithms = 'Kmeans';
          this.KmeanSlider = this.cluster.movie_label;
          this.HierarchicalSlider = 0;
          this.EMSlider = 0;
          this.KNNSlider = 0;
        } else if (this.cluster.movie_cluster === 'Hierarchical') {
          this.algorithms = 'Hierarchical';
          this.HierarchicalSlider = this.cluster.movie_label;
          this.KmeanSlider = 0;
          this.EMSlider = 0;
          this.KNNSlider = 0;
        } else if (this.cluster.movie_cluster === 'EM') {
          this.algorithms = 'EM';
          this.EMSlider = this.cluster.movie_label;
          this.KmeanSlider = 0;
          this.HierarchicalSlider = 0;
          this.KNNSlider = 0;
        } else if (this.cluster.movie_cluster === 'KNN') {
          this.algorithms = 'KNN';
          this.KNNSlider = this.cluster.movie_label;
          this.KmeanSlider = 0;
          this.HierarchicalSlider = 0;
          this.EMSlider = 0;
        }
      } else if (this.target === 'user') {
        if (this.cluster.user_cluster === 'Kmeans') {
          this.algorithms = 'Kmeans';
          this.KmeanSlider = this.cluster.user_label;
          this.HierarchicalSlider = 0;
          this.EMSlider = 0;
        } else if (this.cluster.user_cluster === 'Hierarchical') {
          this.algorithms = 'Hierarchical';
          this.HierarchicalSlider = this.cluster.user_label;
          this.KmeanSlider = 0;
          this.EMSlider = 0;
        } else if (this.cluster.user_cluster === 'EM') {
          this.algorithms = 'EM';
          this.EMSlider = this.cluster.user_label;
          this.KmeanSlider = 0;
          this.HierarchicalSlider = 0;
        }
      }
    },
    search() {
      this.userSearchList = [];
      this.movieSearchList = [];
      if (this.search.length == 0) {
        this.searchInit();
      } else {
        var search = this.search.toLowerCase();
        var a = '';
        var b = '';
        var c = '';

        for (var i = 0; i < this.UserList.length; i++) {
          a = this.UserList[i].username.toLowerCase()
          b = this.UserList[i].gender.toLowerCase()
          c = this.UserList[i].occupation.toLowerCase()
          if (a.includes(search) || b.includes(search) || c.includes(search)) {
            this.userSearchList.push(this.UserList[i]);
          }
        }

        for (i = 0; i < this.movieList.length; i++) {
          a = this.movieList[i].title.toLowerCase()
          b = this.movieList[i].genres.join().toLowerCase()
          //a = this.movieList[i].username.toLowerCase()
          this.movieList[i].rating = Math.round(this.movieList[i].rating * 10) / 10;
          if (a.includes(search) || b.includes(search)) {
            this.movieSearchList.push(this.movieList[i]);
          }
        }

      }
    },

  },
  mounted() {
    this.getuserDetail();
    this.getMovieList();
    this.getAlgorithm();
    this.setBackground();
  },

  methods: {
      getuserDetail() {
        const params = {
          id: this.id
        };
        this.userDetail(params);
        this.searchInit();
      },
    getMovieList() {
      const params = {
        isAdminPage: true,
      };
      this.searchMovies(params);
      this.searchInit();
    },

    deleteMovieInSearchList(id) {
      for (var i = 0; i < this.movieSearchList.length; i++) {
        if (this.movieSearchList[i].id == id) {
          this.movieSearchList.splice(i, 1);
          break;
        }
      }
    },

    deleteUserInSearchList(id) {
      for (var i = 0; i < this.userSearchList.length; i++) {
        if (this.userSearchList[i].id == id) {
          this.userSearchList.splice(i, 1);
          break;
        }
      }
    },
    ...mapActions("data", ['userDetail']),
    ...mapActions("data", ['deleteMovie']),
    ...mapActions("data", ['deleteUser']),
    ...mapActions("data", ["searchMovies"]),
    ...mapActions("data", ["setUserGrade"]),

    goBack() {
      router.go(-1)
    },
    goTo(id) {
      this.$router.push({
        name: 'user-detail',
        params: {
          id: id
        }
      })
    },
    highlight(value, search) {
      var iQuery = new RegExp(search, "ig");
      return value.toString().replace(iQuery, function(matchedTxt) {
        return ('<span class=\'highlight\'>' + matchedTxt + '</span>');
      });
    },

    searchInit() {
      this.userSearchList = [];
      this.movieSearchList = [];
      for (var i = 0; i < this.UserList.length; i++) {
        if (this.UserList[i].username.length >= 25) {
          this.UserList[i].subTitle = this.UserList[i].username.substring(0, 25) + "⋯"
        }
        this.userSearchList.push(this.UserList[i]);
      }
      for (var i = 0; i < this.movieList.length; i++) {
        if (this.movieList[i].title.length >= 25) {
          this.movieList[i].subTitle = this.movieList[i].title.substring(0, 25) + "⋯"
        }
        this.movieList[i].rating = Math.round(this.movieList[i].rating * 10) / 10;
        this.movieSearchList.push(this.movieList[i]);
      }
    },

    setUserGradeAction(item) {
      var params = {
        id: item.id,
        isAdmin: item.isAdmin
      }
      this.setUserGrade(params);
      console.log(item);
    },

    getColor(rating) {
      if (rating > 4) return 'green';
      else if (rating > 3) return 'orange';
      else if (rating > 2) return 'yellow';
      else return 'red'
    },
    async setAlgorithm() {
      let params = {};
      switch (this.algorithms) {
        case "Kmeans": {
          params = {
            target: this.target,
            cluster: this.algorithms,
            k: this.KmeanSlider
          };
          break;
        }
        case "Hierarchical": {
          params = {
            target: this.target,
            cluster: this.algorithms,
            k: this.HierarchicalSlider,
          };
          break;
        }
        case "EM": {
          params = {
            target: this.target,
            cluster: this.algorithms,
            k: this.EMSlider,
          };
          break;
        }
        case "KNN": {
          params = {
            target: this.target,
            cluster: this.algorithms,
            k: this.KNNSlider,
          };
          break;
        }
      }
      if (this.target && this.algorithms) {
        this.isLoading = true;
        const res = await api.setAlgorithm(params);
        if (res) {
          this.isLoading = false
          Swal.fire(
            'Complete!',
            '알고리즘 설정이 완료되었습니다.',
            'success'
          )
        }
      }
    },
    async getAlgorithm() {
      const res = await api.getClustering();
      this.cluster = res.data[0];
      if (this.cluster.movie_cluster === 'Kmeans') {
        this.algorithms = 'Kmeans';
        this.KmeanSlider = this.cluster.movie_label
      } else if (this.cluster.movie_cluster === 'Hierarchical') {
        this.algorithms = 'Hierarchical';
        this.HierarchicalSlider = this.cluster.movie_label
      } else if (this.cluster.movie_cluster === 'EM') {
        this.algorithms = 'EM';
        this.EMSlider = this.cluster.movie_label
      } else if (this.cluster.movie_cluster === 'KNN') {
        this.algorithms = 'KNN';
        this.KNNSlider = this.cluster.movie_label
      }
    },
    setBackground(){
      var random= Math.floor(Math.random() * this.images.length);
      this.colIndex.push(random);
      if(this.colIndex.length > 1){
        this.colIndex.shift();
      }
      this.index = this.colors[this.colIndex[0]];
      document.getElementById('startBackground').style.backgroundImage=this.images[this.colIndex[0]];
    },
  },

}
</script>
<style>
.highlight {
  background-color: #fdc23e;
  font-weight: bold;
  color: #000000;
}

.btnStyle{
  font-weight: bold;
  color: rgba(255,255,255,1);
}
</style>
