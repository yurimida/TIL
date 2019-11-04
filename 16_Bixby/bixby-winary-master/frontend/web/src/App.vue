<template>
  <div id="app">
    <!-- navbar -->
    <navbar />

    <!-- MainPage -->
    <router-view />

    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

// Components
import Navbar from '@/components/modules/NavBar';
import Footer from '@/components/modules/Footer';


export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
  methods: {
    ...mapActions('wine', ['getWineList'])
  },
  created() {
    this.getWineList();
  }
}
</script>

<style>
/* reset.css */
/* Google Fonts */
@import './style/reset';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F8F8F8;
}
</style>
