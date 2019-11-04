<template>
  <v-form ref="form">
    <v-layout>
      <v-flex xs5>
        <v-radio-group v-model="sortBy" row>
          <v-radio :color="index" value="view_cnt" >
            <template v-slot:label>
              <h4 class="textcolor">조회순</h4>
            </template>
          </v-radio>
          <v-radio :color="index" value="average_rating">
            <template v-slot:label>
              <h4 class="textcolor">평점순</h4>
            </template>
          </v-radio>
          <v-radio :color="index" value="watch_cnt">
            <template v-slot:label>
              <h4 class="textcolor">시청순</h4>
            </template>
          </v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs5>
        <v-select solo v-model="genre" color="#263040" item-color="#263040" :items="genres" label="genre" />
      </v-flex>
      <v-flex xs5>
        <v-select solo v-model="age" color="#263040" item-color="#263040" :items="ages" item-text="text" item-value="value" label="age" />
      </v-flex>
      <v-flex xs5>
        <v-select solo v-model="occupation" color="#263040" item-color="#263040" :items="occupations" label="occupation" />
      </v-flex>
      <v-flex xs5>
        <v-select solo v-model="gender" color="#263040" item-color="#263040" :items="genders" item-text="text" item-value="value" label="gender" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs8 style="margin: auto;">
        <v-text-field hide-details solo v-model="title" color="#263040" label="영화 제목" @keyup="onSubmit" />
      </v-flex>
    </v-layout>

  </v-form>
</template>

<script>
import {  mapState,  mapActions} from "vuex";
export default {
  props: {
    submit: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    title: '',
    genres: ["All", "Action","Adventure", "Animation", "Children's", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western"],
    ages: [
      {text:"All", value:"All"},
      {text:"Under 18", value:"1"},
      {text:"18-24", value:"18"},
      {text:"25-34", value:"25"},
      {text:"35-44", value:"35"},
      {text:"45-49", value:"45"},
      {text:"50-55", value:"50"},
      {text:"56+", value:"56"},
    ],
    occupations: ["All","other","academic/educator","artist","clerical/admin","college/grad student","customer service","doctor/health care","executive/managerial","farmer","homemaker","K-12 student","lawyer","programmer","retired","sales/marketing","scientist","self-employed","technician/engineer","tradesman/craftsman","unemployed","writer"],
    genders: [
      {text:"All", value:"All"},
      {text:"Male", value:"M"},
      {text:"Female", value:"F"},
    ],
    sortBy: 'view_cnt',
    genre: 'All',
    age: 'All',
    occupation: 'All',
    gender: 'All',
    isDetail: true,

    index:'',
  }),
  computed:{
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
    genre() {
      this.onSubmit()
    },
    age() {
      this.onSubmit()
    },
    occupation() {
      this.onSubmit()
    },
    gender() {
      this.onSubmit()
    },
    sortBy() {
      this.onSubmit()
    }
  },
  mounted() {
    this.onSubmit()
  },
  methods: {
    onSubmit: function() {
      this.$store.state.data.searchInput = this.title;

      const params = {
        title: this.title,
        genre: this.genre,
        age: this.age,
        occupation: this.occupation,
        gender: this.gender,
        sortBy: this.sortBy,
      };

      this.submit(params);
    }
  }
};
</script>
