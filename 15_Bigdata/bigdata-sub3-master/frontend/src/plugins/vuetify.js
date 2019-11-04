import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c',
      one: '#A4403D',
      two: '#CA7C7C',
      three: '#E9C9CA',
      four: '#FEF1E9',
      five: '#4C4955',
      six: '#263040'
  }
});
