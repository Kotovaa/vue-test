<template lang="pug">
  .auth
    Login
</template>

<script>
import Login from '@/components/Login.vue';

export default {
  name: 'Home',
  components: {
    Login,
  },
};
</script>

<style scoped lang="scss">
  .auth {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
