<template>
  <v-container justify-center fill-height>
      <v-flex xs12 text-center ma-5 id="StartPageContainer">
        <h1 style="color:white">
          최고의 영화 추천을 경험하세요
        </h1>
        <p style="color:rgba(255,255,255,0.5)">
         1,000,000개의 데이터를 바탕으로 된 추천 시스템을 경험하세요
        </p>
        <v-btn large rounded :color="index" :to="{name:'login-page'}"><span class="btnText" >시작하기</span></v-btn>
      </v-flex>

    <!-- <div id="startBackground"></div> -->
    <!-- <div class="darker"></div> -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    url: "",
    index: '',
    isLoad: false,

  }),

  mounted() {
    this.randombg();
    //setInterval(this.randombg, 5000);
  },

  computed: {
    ...mapState({
      images: state => state.data.images,
      colors: state => state.data.colors,
      colIndex: state => state.data.colIndex,
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
  methods: {
    /* 작성일 : 2019.10.05
    작성자 : 이찬호
    기능 : StartPage 배경화면을 랜덤으로 골라서 세팅함
    */
    randombg(){
      var random= Math.floor(Math.random() * this.images.length);
      this.colIndex.push(random);
      if(this.colIndex.length > 1){
        this.colIndex.shift();
      }
      this.index = this.colors[this.colIndex[0]];
      document.getElementById('startBackground').style.backgroundImage=this.images[this.colIndex[0]];
    },
  }
}
</script>

<style>
#StartPageContainer{
  z-index: 3;
}
.loading{
  background: black;
}
.btnText{
  color: white;
  font-weight: bold;
}

</style>
