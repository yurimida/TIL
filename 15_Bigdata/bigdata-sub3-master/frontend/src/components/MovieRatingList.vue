<template>
<v-container class="pa-2" fluid grid-list-md my-9>
  <!-- <v-btn v-on:click="test"></v-btn> -->
  <v-row justify="center" id="bannerCard">
    <v-card width="50%">
      <v-flex>
        <v-row justify="center" align="center">
          {{ratingCheckedList.length}} 개 선택하셨습니다.
        </v-row>
      </v-flex>
      <v-flex my-3>
        <v-row justify="center" align="center">
          <v-progress-linear :value="progress" :color="index" absolute height="8"></v-progress-linear>
        </v-row>
      </v-flex>
      <v-flex>
        <v-row justify="center" align="center" style="margin-bottom: 1%">
          <v-btn small rounded v-on:click="resetCheckedList">초기화</v-btn>
          <template v-if="ratingCheckedList.length >= 1">
            <v-btn small rounded :color="index" v-on:click="setRating">
              <span class="btnStyle">
                평점주기
              </span>
            </v-btn>
          </template>
          <template v-else>
            <v-btn small rounded disabled>평점주기</v-btn>
          </template>
        </v-row>
      </v-flex>
    </v-card>
  </v-row>

  <v-layout row>
    <v-flex v-for="i in movieList.length > limit ? limit : movieList.length" sm4 md3>
      <MovieRatingCard :movie="movieList[i-1]" />
    </v-flex>

  </v-layout>

</v-container>
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex";
import MovieRatingCard from "./MovieRatingCard"
import Swal from 'sweetalert2'
export default {
  components: {
    MovieRatingCard
  },

  data: () => ({
    limit: 20,
    numChecked: 0,
    index:'',
  }),
  mounted() {
    this.getHeader()
  },
  computed: {
    // pagination related variables
    movieListEmpty() {
      return this.movieList.length === 0;
    },
    ...mapState({
      movieList: state => state.data.ratingMovieList,
      ratingCheckedList: state => state.data.ratingCheckedList,
      colors: state => state.data.colors,
      images: state => state.data.images,
      colIndex: state => state.data.colIndex
    }),
    getColIndex(){
      this.index = this.colors[this.colIndex[0]];
      return this.$store.state.colIndex;
    },

    progress() {
      if (this.ratingCheckedList.length >= 10) {
        return 100;
      } else {
        return this.ratingCheckedList.length * 10 % 110;
      }
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 50)]
    },
    innerWidth() {
      return window.innerWidth;
    },
  },
  watch: {
    getColIndex(){

    },
  },
  methods: {
    test() {
      console.log(this.ratingCheckedList);
    },
    ...mapActions("data", ["setRatings"]),

    resetCheckedList() {
      for (var i = 0; i < this.movieList.length; i++) {
        this.movieList[i].rating = 0;
      }
      let param = {
        id: 2,
      }
      this.movieList.push(param);
      this.movieList.pop();
      this.ratingCheckedList.splice(0);
    },

    getHeader() {
      window.onscroll = function() {
        myFunction()
      };
      var header = document.getElementById("headerBar");
      var banner = document.getElementById("bannerCard");

      function myFunction() {
        var sticky = header.offsetHeight;
        if (window.pageYOffset + banner.offsetHeight + 20 > sticky) {
          banner.style.top = sticky + "px";
        }
      }
    },

    async setRating() {
      if (this.ratingCheckedList.length > 0) {
        await this.setRatings(this.ratingCheckedList);
        await this.postMatrix()
      }
      this.$router.push({
        name: 'main'
      })

      Swal.fire({
        type: 'success',
        title: '평점이 등록되었습니다.',
        showConfirmButton: false,
        timer: 1000
      })
    },
    async postMatrix() {
      const params = {
        id: this.$store.state.currentUser.user_id
      };
      await this.matrix(params);

    },
    ...mapActions("data", ['matrix']),
    ...mapState({
      movie: state => state.data.movie
    }),

    initLim() {
      if (window.innerWidth >= 1264)
        this.limit = 4;
      else
        this.limit = 1;

    },

    handleScroll() {
      var limit = document.body.offsetHeight - window.innerHeight;
      if (window.scrollY >= limit - 200) {
        if (window.innerWidth >= 1264) {
          this.limit += 8;
        } else if (window.innerWidth < 1264 && window.innerWidth >= 600) {
          this.limit += 6;
        } else {
          this.limit += 4;
        }
      }
    },


  },

  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    this.ratingCheckedList.splice(0);
  },

};
</script>
<style>
#bannerCard {
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>
