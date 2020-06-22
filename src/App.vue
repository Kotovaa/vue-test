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
          store.dispatch(LOGOUT)
        }
        throw err;
      });
    }
  }
</script>

<style lang="scss">
  @import './assets/reset.scss';
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  #app {
    position: relative;
    height: 100%;
  }
  html, body {
    font-family: 'Roboto', sans-serif;
  }
</style>
