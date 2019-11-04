<!-- 영화 평점 페이지 -->
<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12>
        <buttonTop/>
        <UpdateRatingList/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

import buttonTop from '../ButtonTop.vue'
import UpdateRatingList from "../UpdateRatingList";
export default {
  components: {
    UpdateRatingList,
    buttonTop
  },
  data: () => ({}),
  computed: {
    ...mapState({
      movieList: state => state.data.ratingList,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex
    }),
    innerWidth(){
      return window.innerWidth;
    }
  },
  mounted(){
    this.getMovieList();
    this.setBackground();
  },
  methods: {
    ...mapActions("data", ["getRating"]),
    getMovieList() {
      const params = {
        isRatingUpdatePage: true,
        user_id: this.$store.state.currentUser.user_id
      };
      this.getRating(params)
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
