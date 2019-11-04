<template>
  <v-container justify-center fill-height>
      <v-flex xs12 text-center ma-5 id="StartPageContainer">
        <h1 style="color:white">
          혹시 구독을 안하셨나요?
        </h1>
        <p style="color:rgba(255,255,255,0.5)">
         구독을 하시면, 1,000,000개의 데이터를 바탕으로 된 추천 시스템을 경험하실 수 있습니다.
        </p>
        <v-btn large rounded :color="index" :to="{name: 'user-detail', params: {id: $store.state.currentUser.user_id}}"><span class="btnText" >구독하기</span></v-btn>
      </v-flex>

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
      colors: state => state.data.colors
    })
  },
  methods: {
    /* 작성일 : 2019.10.05
    작성자 : 이찬호
    기능 : StartPage 배경화면을 랜덤으로 골라서 세팅함
    */
    randombg(){
      // var sl = document.getElementById('startBackground');
      // var s = window.getComputedStyle(sl).backgroundImage
      var random= Math.floor(Math.random() * this.images.length);
      this.index = this.colors[random];
      this.$store.state.colIndex = random;
      document.getElementById('startBackground').style.backgroundImage=this.images[random];
      // document.getElementById('startBackground').style.backgroundImage='url("' + this.images[random] + '")';
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
