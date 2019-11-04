<template>
  <div>
    <v-container>
      <v-layout mb-5 style="margin-top: 5%">
        <!--<p>{{ movieList[0] }}</p>-->
        <v-flex v-if="movieList!==undefined&&movieList[0]">
          <h1 class="mb-3 text-sm-center textcolor" style="font-weight: 600; font-size: 40px;"><strong>{{ movieList[0].title }}</strong>
          <a v-bind:href="movieList[0].trailer" target="_blank" style="text-decoration: none;">
              <v-btn text style="color: aliceblue">Play<v-icon style="color: red">mdi-play</v-icon>
              </v-btn>
            </a></h1>
          <hr style="width: 97%">
          <br>
          <v-layout>
            <v-flex xs3>
              <v-img v-if="movieList[0].poster" :src="movieList[0].poster" max-width="300px" max-height="400px" />
            </v-flex>
            <v-flex xs1></v-flex>
            <v-flex xs8>
              <v-layout>
                <p class="mr-3" style="color: red; font-size: 20px; font-weight: bold">{{ movieList[0].genres.join(" / ") }}</p>
              </v-layout>
              <v-layout>
                <p class="mr-3 textcolor">평점 : {{ movieList[0].rating.toFixed(1) }}</p>
              </v-layout>
              <v-layout>
                <p class="textcolor"><span>시청자 : </span>
                  <span>
                    <!--<v-row justify="center">-->
                      <v-dialog v-model="dialog" scrollable max-width="300px">
                        <template v-slot:activator="{ on }">
                          <v-btn color="#A4403D" style="font-weight: bold" text v-on="on">{{ movieList[0].users.length }}</v-btn>
                        </template>
                        <v-card>
                          <v-card-title>시청자들</v-card-title>
                          <v-divider></v-divider>
                          <v-card-text style="height: 300px;">
                            <div v-for="user in movieList[0].users">
                              <router-link class="watchedMovie" :to="{name: 'user-detail', params: {id: user[0]}}" style="text-decoration: none; color: black">
                                {{ user[1] }}
                              </router-link>
                            </div>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-btn color="blue darken-1" text @click="dialog=false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    <!--</v-row>-->
                  </span>
                </p>
              </v-layout>
              <v-layout>
                <p class="textcolor">줄거리 : </p>
              </v-layout>
              <v-layout>
                <p v-if="movieList[0].summary" class="mr-3 textcolor" style="height: 260px; overflow-y:scroll;">{{ movieList[0].summary }}</p>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs1 v-for="movie in movieList.slice(1, movieList.length)">
              <router-link :to="{name: 'movie-detail', params: {id: movie.id}}" style="text-decoration: none; color: black">
                <div class="movie-choice img_scale">
                  <v-img :src="movie.poster" height="150px" style="margin: 10% 10%"></v-img>
                </div>
              </router-link>
            </v-flex>
          </v-layout>

        </v-flex>
      </v-layout>
      <v-layout text-sm-center my-5>
        <v-flex>
          <v-btn rounded color="#37527d" @click="goBack">
            <span class="btnStyle">BACK
            </span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex";
import router from '../../router'
export default {
  props: {
    id: 0
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapState({
      movieList: state => state.data.movie,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex
    }),
    getColIndex(){
      this.index = this.colors[this.colIndex[0]];
      return this.$store.state.colIndex;
    }
  },
  watch: {
    '$route'(to, from) {
      this.jiss()
    },
    getColIndex(){

    },
  },
  mounted() {
    this.jiss();
    this.setBackground();
  },
  methods: {
    jiss() {
      const params = {
        id: this.id
      };
      this.searchMovies(params)
    },
    ...mapActions("data", ['searchMovies']),
    goBack() {
      router.go(-1)
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
  .textcolor {
    color: #ffffff;
  }
</style>
