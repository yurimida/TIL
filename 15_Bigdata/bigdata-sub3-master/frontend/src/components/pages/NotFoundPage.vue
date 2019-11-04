<template>
  <v-container justify-center fill-height>
      <v-flex xs12 text-center ma-5 id="StartPageContainer">
        <v-img src="https://i.imgur.com/OpNML5P.png" aspect-ratio="6" contain></v-img>
        <h1 style="color:white">
          404 Not Found
        </h1>
        <br>
        <p style="color:rgba(255,255,255,1)">
          이 URL은 존재하지 않는 URL 입니다
        </p>
        <p style="color:rgba(255,255,255,0.5)">
          이왕 잘 못 온거 잠시 쉬었다 가세요
        </p>

        <v-btn v-if="user" large rounded :color="index" :to="{name:'main'}"><span class="btnText" >홈으로</span></v-btn>
        <v-btn v-else large rounded :color="index" :to="{name:'home'}"><span class="btnText" >홈으로</span></v-btn>
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
    user:'',
  }),

  mounted() {
    this.user = this.$store.state.currentUser;
    this.setBackground();
  },

  computed: {
    ...mapState({
      images: state => state.data.images,
      colors: state => state.data.colors,
      colIndex: state => state.data.colIndex,
    })
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
