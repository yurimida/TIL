<template>
  <v-app id="app">
    <Header/>
    <router-view class= "contents"/>

    <div id="startBackground"></div>
    <div class="darker"></div>
  </v-app>
</template>

<script>
import router from "./router";
import Header from "./components/Header";
import Register from "./components/Register";
import { mapState, mapActions } from "vuex";

export default {
  name: "LoginPage",
  components: {
    Register,
    Header,
  },
  data: () => ({
    height:0,
    user: '',
    isuser: false,
    isAdmin: false,

    isHeader: true,
  }),
  computed: {
    get() {
      this.getUser();
    },
    ...mapState({
      images: state => state.data.images,
      colors: state => state.data.colors
    }),
  },

  watch: {
    currentUser() {
      console.log(this.$store.state.currentUser)

      this.getUser()
      // console.log(this.user)
    },
  },
  mounted() {
    this.user = this.$store.state.currentUser;
    this.isHeader = this.$store.state.isHeader;
    this.getUser()
  },
  created() {
    this.user = this.$store.state.currentUser;
    if (this.$session.has("token")) {
        this.user = this.$store.state.currentUser;
        this.isuser = true
        if (this.user.username === 'admin') {
        this.isAdmin = true
        }
      }
      else {
        this.isuser = false;
        this.isAdmin = false
      }
  },
  methods: {
    goTo: function(path) {
      router.push({ name: path });
    },
    getUser() {
      if (this.$session.has("token")) {
        this.user = this.$store.state.currentUser
        this.isuser = true
        if (this.user.username === 'admin') {
          console.log("App.vue, getUser()",this.user)

        this.isAdmin = true
        }
      }
      else {
        this.isuser = false;
        this.isAdmin = false
      }
    },

  },
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}

.contents{
  z-index: 4;
}
#startBackground{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: #000000;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}

.darker {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #000000;
    opacity: 0.7;
}


</style>
