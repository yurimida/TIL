<template>
  <div v-if="windows.width > 600">
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" max-width="374" :elevation="hover ? 5 : 2">
      <v-responsive :aspect-ratio="16/9">
        <v-img height="300" :src="movie.poster">
          <v-expand-transition>
            <div v-if="hover||movie.rating>0" class="d-flex transition-fast-in-fast-out v-card--reveal white--text" style="height: 50%;">
              <v-flex text-center align-center>
                {{movie.title}}
                <br>
                <v-divider color="gray"></v-divider>
                <v-rating v-model="ratingss" color="yellow " background-color="orange darken-3" half-increments hover dense size="20">
                </v-rating>
                <v-btn v-if="movie.rating>0" fab text small color="red" v-on:click="resetRating">
                  <v-icon size="17">mdi-close-circle</v-icon>
                </v-btn>
              </v-flex>
            </div>
          </v-expand-transition>
        </v-img>
      </v-responsive>
    </v-card>
  </v-hover>
  </div>
  <div v-else>
    <v-card
      max-width="600" hover
      dark
    >
      <v-list-item three-line>
        <v-list-item-avatar
          size="100"
          tile
        >
        <v-img :src="movie.poster"></v-img>
        </v-list-item-avatar>

        <v-list-item-content class="align-self-start">

          {{movie.title}}
          <!-- <v-list-item-title
            class="headline"
            v-text="movie.title"
          ></v-list-item-title> -->

          <v-rating v-model="ratingss" color="yellow " background-color="orange darken-3" half-increments hover dense size="20">
          </v-rating>
          <v-btn v-if="movie.rating>0" fab text small color="red" v-on:click="resetRating">
            <v-icon size="17">mdi-close-circle</v-icon>
          </v-btn>
        </v-list-item-content>

      </v-list-item>
    </v-card>
  </div>
</template>

<style lang="css" scoped>
</style>


<script>
import { mapState } from "vuex";
export default {

  props: {
    movie:{
      type:Object,
      default:'',
    },
  },
  data(){
      return {
          ratingss : this.movie.rating,
          isDelete : false,
          windows: {
            width: 0,
            height: 0
          },
      }
  },
  computed:{
    ...mapState({
      movieList: state => state.data.ratingMovieList,
      ratingCheckedList: state => state.data.ratingCheckedList
    }),
    index(){
      for(var i=0; i<this.movieList.length; i++){
        if(this.movie.id == this.movieList[i].id){
          return i;
        }
      }
    }
  },
  watch:{
    movieList(){
      this.ratingss = this.movieList[this.index].rating;
    },
    ratingss(){
      let isInList = false;
      let ind = -1;
      if(!this.isDelete){
        for(var i=0; i<this.ratingCheckedList.length; i++){
          if(this.ratingCheckedList[i].movie_id == this.movieList[this.index].id){
            isInList = true;
            ind = i;
            break;
          }
        }

        this.movieList[this.index].rating = this.ratingss;

        if(isInList){
          this.ratingCheckedList[ind].rating_value = this.ratingss;
        }else if(this.ratingss == 0){
          console.log();
        }else{
          const params = {
            user_id : this.$store.state.currentUser.user_id,
            movie_id: this.movieList[this.index].id,
            rating_value: this.ratingss,
            timestamp: this.getTimeStamp(),
            update: true,
          };
          //this.switchMovie();
          this.ratingCheckedList.push(params);
        }

      }
      this.isDelete = false;
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.windows.width = window.innerWidth;
      this.windows.height = window.innerHeight;
    },
    resetRating(){
      for(var i=0; i<this.ratingCheckedList.length; i++){
        if(this.ratingCheckedList[i].movie_id == this.movieList[this.index].id){
          this.ratingCheckedList.splice(i, 1);
          i--;
        }
      }
      this.movieList[this.index].rating = 0;
      this.ratingss = 0;
      this.isDelete = true;
    },
    switchMovie(){
      let temp = this.movieList[this.index];
      this.movieList.splice(this.index,1,this.movieList[this.ratingCheckedList.length]);
      this.movieList.splice(this.ratingCheckedList.length,1,temp);
      // this.movieList[this.index] = this.movieList[this.ratingCheckedList.length];
      // this.movieList[this.ratingCheckedList.length] = temp;
    },
    getTimeStamp() {
       return Math.round((new Date).getTime()/1000);
    }
  },
};
</script>

<style>
.v-card--reveal {
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>
