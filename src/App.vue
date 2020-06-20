<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from './store'
  import { LOGOUT } from "./store/types";
  export default {
    created: function () {
      axios.interceptors.response.use(function (response) {
        return response;
      }, function (err) {
        if (err.response?.status === 401 && err.response?.config && !err.response?.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          store.dispatch(LOGOUT)
          // you can also redirect to /login if needed !
        }
        throw err;
      });
    }
  }
</script>

<style lang="scss">
  @import './assets/reset.scss';
  #app {
    position: relative;
    height: 100%;
  }
</style>
