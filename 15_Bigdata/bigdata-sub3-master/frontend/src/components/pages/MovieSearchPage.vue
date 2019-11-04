<!-- 영화 검색 페이지 -->
<template>
  <v-container grid-list-md text-center>
    <v-layout justify-center wrap>

      <buttonTop/>
      <!-- 검색 폼 -->
      <v-flex xs9>
        <div class="pa-10" style="font-size: 35px ; color:white">영화 검색</div>
        <MovieSearchForm :submit="searchMovies" />
      </v-flex>
      <!-- 검색 결과 -->
      <v-flex xs11>
        <h2 style="color:white"> {{numberWithCommas(movieList.length)}} results</h2>
        <MovieList :movie-list-cards="movieList" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import buttonTop from '../ButtonTop.vue'
import { mapState, mapActions } from "vuex";
import MovieSearchForm from "../MovieSearchForm";
import MovieList from "../MovieList";
export default {
  components: {
    MovieList,
    MovieSearchForm,
    buttonTop
  },
  data: () => ({}),
  computed: {
    ...mapState({
      movieList: state => state.data.movieSearchList,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex
    }),
  },
  mounted(){
    this.setBackground();
  },
  methods: {
    ...mapActions("data", ["searchMovies"]),

    setBackground(){
      var random= Math.floor(Math.random() * this.images.length);
      this.colIndex.push(random);
      if(this.colIndex.length > 1){
        this.colIndex.shift();
      }
      this.index = this.colors[this.colIndex[0]];
      document.getElementById('startBackground').style.backgroundImage=this.images[this.colIndex[0]];
    },

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

  }
};
</script>
