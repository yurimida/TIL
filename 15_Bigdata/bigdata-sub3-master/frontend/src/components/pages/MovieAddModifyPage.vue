<template>
  <v-container my-12>
    <v-row justify="center" sm6>
      <v-card
        color ="rgba(0,0,0,0)"
        v-if="movieList[0]" width="600px">
        <h1 class="text-sm-center" style="color:white"><strong>{{ movieList[0].title }}</strong></h1>
        <hr>
        <v-col cols="12">
          <v-row justify="center">
            <v-card width="50%">
              <v-img v-if="movieList[0].poster" :src="movieList[0].poster"
                  aspect-ratio="0.7"/>
            </v-card>
          </v-row>
          <v-row >
            <v-select
              v-model="movieList[0].genres"
              :items="genreItems"
              chips
              label="Genres"
              solo
              hide-details
              multiple
            >
              <template v-slot:selection="{ item, index }">
                 <v-chip :color="colorIndex" v-if="index === 0">
                   <span class="btnStyle">{{ item }}</span>
                 </v-chip>
                 <span
                   v-if="index === 1"
                   class="grey--text caption"
                 >(+{{ movieList[0].genres.length - 1 }} others)</span>
               </template>
              <template v-slot:prepend-item>
                <v-list-item
                  ripple
                  @click="toggle"
                >
                  <v-list-item-action>
                    <v-icon :color="genreItems.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ select }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
            </v-select>

          </v-row>
          <v-row justify="center" ma-5>
            <v-textarea
              v-model="movieList[0].summary"
              label="Summary"
              counter
              auto-grow
              solo
              detail-Color = "white"
              maxlength="2500"

            ></v-textarea>
          </v-row>
          <v-row justify="center">
            <v-layout text-sm-center my-5>
              <v-row justify="center" align="center">
                <v-btn rounded :color="colorIndex" @click="modifyMovieAction">
                  <span class="btnStyle">
                    Modify
                  </span>
                </v-btn>
                <v-btn text color="white" @click="goBack"><span class="btnStyle">back</span></v-btn>
              </v-row>
            </v-layout>
          </v-row>
        </v-col>
      </v-card>
    </v-row>


  </v-container>
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex";
import router from '../../router'
import Swal from 'sweetalert2'
export default {
  props: {
    id: '',
  },
  data() {
    return {
      dialog: false,
      genreItems:['Action',
                  'Adventure',
                  'Animation',
                  "Children's",
                  'Comedy',
                  'Crime',
                  'Documentary',
                  'Drama',
                  'Fantasy',
                  'Film-Noir',
                  'Horror',
                  'Musical',
                  'Mystery',
                  'Romance',
                  'Sci-Fi',
                  'Thriller',
                  'War',
                  'Western'],
      colorIndex:'',
    }
  },
  computed: {
    selectAllGenres () {
      return this.movieList[0].genres.length == this.genreItems.length
    },
    selectSomeGenre () {
      return this.movieList[0].genres.length > 0 && !this.selectAllGenres
    },
    icon () {
      if (this.selectAllGenres) return 'mdi-close-box'
      if (this.selectSomeGenre) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    select(){
      if (this.movieList[0].genres.length > 0) return 'Clear All'
      else return 'Select All'
    },
    ...mapState({
         movieList: state => state.data.movie,
         colors: state => state.data.colors,
         images: state => state.data.images,
         colIndex: state => state.data.colIndex
    }),
    getColIndex(){
      this.colorIndex = this.colors[this.colIndex[0]];
      return this.$store.state.colIndex;
    }
  },
  watch: {
    '$route'(to, from) {
      this.jiss()
    },
    getColIndex(){

    }
  },
  mounted() {
    this.jiss();
    this.setBackground();
  },
  methods: {
    setBackground(){
      var random= Math.floor(Math.random() * this.images.length);
      this.colIndex.push(random);
      if(this.colIndex.length > 1){
        this.colIndex.shift();
      }
      this.index = this.colors[this.colIndex[0]];
      document.getElementById('startBackground').style.backgroundImage=this.images[this.colIndex[0]];
    },
    modifyMovieAction(){
      const params = {
        id : this.movieList[0].id,
        title : this.movieList[0].title,
        genres : this.movieList[0].genres,
        average_rating : this.movieList[0].average_rating,
        total_rate : this.movieList[0].total_rate,
        view_cnt : this.movieList[0].view_cnt,
        user : this.movieList[0].user,
        summary : this.movieList[0].summary,
        poster_url : this.movieList[0].poster_url,
        cluster : this.movieList[0].cluster,
      };
      this.modifyMovie(params);
      Swal.fire({
        type: 'success',
        title: '수정되었습니다.',
        showConfirmButton: false,
        timer: 1000
      })
      this.goBack();
    },
    async jiss() {
      const params = {
        id: this.id
      };

      let res = await this.searchMovies(params);
      console.log(this.id, this.movieList[0]);
    },

    ...mapActions("data", ['searchMovies']),
    ...mapActions("data", ['modifyMovie']),

    goBack() {
      router.go(-1)
    },
    toggle () {
      this.$nextTick(() => {
        if (this.selectAllGenres) {
          this.movieList[0].genres.splice(0);
        } else if(this.selectSomeGenre){
          this.movieList[0].genres.splice(0);
        }else {
          this.movieList[0].genres = this.genreItems.slice()
        }
      })
    },
  },
}
</script>
