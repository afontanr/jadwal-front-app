import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import Vuelidate from 'vuelidate'
import axios from 'axios'

Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8080'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
