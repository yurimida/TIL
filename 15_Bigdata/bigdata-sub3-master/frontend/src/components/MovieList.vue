<template>
  <v-container class="pa-2" fluid grid-list-md>
    <v-layout row>
      <v-flex v-for="card in movieListCardsSliced" :key="card.id" pa-2 sm4>
        <MovieListCard
          :id="card.id"
          :poster="card.poster"
          :title="card.title"
          :genres="card.genres"
          :rating="card.rating"
          :view-cnt="card.viewCnt"
          :watch-cnt="card.watchCnt"
        />
      </v-flex>
      <v-pagination :color="index"
                    v-if="maxPages > 1"
                    v-model="page"
                    :length="maxPages"
                    :total-visible="7"
                    circle
                    style="margin: 6%" />
    </v-layout>
  </v-container>
</template>

<script>
import MovieListCard from "./MovieListCard"
import {  mapState,  mapActions} from "vuex";
export default {
  components: {
    MovieListCard,
  },
  props: {
    movieListCards: {
      type: Array,
      default: () => new Array(),
    },
  },
  data: () => ({
    cardsPerPage: 12,
    page: 1,
    index:'',
  }),
  computed: {
    // pagination related variables
    movieListEmpty() {
      return this.movieListCards.length === 0;
    },
    maxPages() {
      return Math.floor((this.movieListCards.length + this.cardsPerPage - 1) / this.cardsPerPage)
    },
    movieListCardsSliced() {
      return this.movieListCards.slice(this.cardsPerPage * (this.page - 1), this.cardsPerPage * this.page)
    },
    ...mapState({
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
    getColIndex(){

    },
  },
};
</script>
