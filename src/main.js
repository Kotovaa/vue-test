import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'
import App from './App.vue';
import router from './router';
import store from './store';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
