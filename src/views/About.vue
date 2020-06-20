<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout">Выйти</button>
  </div>
</template>
<script>
  import { LOGOUT } from "../store/types";

  export default {
    methods: {
      logout: function () {
        this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>
