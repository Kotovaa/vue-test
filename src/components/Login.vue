<template>
  <div class="login">
    <form class="login__form" @submit.prevent="login">
      <h1>Вход</h1>
      <input type="text" v-model="email" required class="login__form_username" placeholder="Email">
      <label>
        <input type="password" v-model="password" required class="login__form_password" placeholder="Пароль">
        <i class="far fa-eye"></i>
      </label>
      <button type="submit">Войти</button>
    </form>
    <span>{{ getErr }}</span>
  </div>
</template>

<script>
  import { AUTH_REQ } from "../store/types";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    getErr() {
      return this.$store.getters.get_error
    }
  },
  methods: {
    login: function() {
      const { email, password } = this
      this.$store.dispatch(AUTH_REQ, { email, password }).then(() => {
        this.$router.push('/about')
      })
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  padding: 30px 60px;
  background: #fff;
  box-shadow: 0px 0px 31px 0px rgba(0, 0, 0, 0.4);
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    input {
      height: 40px;
      border-radius: 5px;
      border: 1px solid #8c939d;
      padding: 0 10px;
      margin-bottom: 20px;
    }
    button {
      width: 100%;
      height: 40px;
      background: #90EE90;
      color: #fff;
      text-align: center;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
