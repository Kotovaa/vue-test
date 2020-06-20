<template>
  <div class="home">
    <Login />
  </div>
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
  .home {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
