<!-- 영화 평점 페이지 -->
<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12>
        <buttonTop/>
        <MovieRatingList/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

import buttonTop from '../ButtonTop.vue'
import MovieRatingList from "../MovieRatingList";
export default {
  components: {
    MovieRatingList,
    buttonTop
  },
  data: () => ({}),
  computed: {
    ...mapState({
      movieList: state => state.data.ratingMovieList,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex
    }),
    innerWidth(){
      return window.innerWidth;
    },
  },
  mounted(){
    this.getMovieList()
    this.setBackground();
    console.log(this.movieList)
  },
  methods: {
    ...mapActions("data", ["initRatingMovies"]),
    getMovieList() {
      const params = {
        isRatingPage: true,
        user_id: this.$store.state.currentUser.user_id
      };
      this.initRatingMovies(params)
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
  }
};
</script>
