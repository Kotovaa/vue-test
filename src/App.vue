<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
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
@import './assets/reset.scss'
</style>
