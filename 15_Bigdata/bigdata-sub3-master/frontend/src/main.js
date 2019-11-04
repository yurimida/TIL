import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VueSession from 'vue-session'

Vue.config.productionTip = false
Vue.use(VueSession)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
