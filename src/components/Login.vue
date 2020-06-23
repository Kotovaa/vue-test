<template lang="pug">
  .login
    form.login__form(@submit.prevent="login")
      h1 Вход
      input.login__form_username(
        type='text'
        v-model='email'
        required
        placeholder='Email'
      )
      label
        input.login__form_password(
          :type="passwordType"
          v-model="password"
          required
          placeholder="Пароль"
        )
        span(@click="switchVisibilityPassword")
          i.far.fa-eye
      button(type='submit') Войти
    span {{getErr}}
</template>

<script>
  import { AUTH_REQ } from "../store/types";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      passwordType: 'password'
    }
  },
  computed: {
    getErr() {
      return this.$store.getters.get_error
    }
  },
  methods: {
    login() {
      const { email, password } = this
      this.$store.dispatch(AUTH_REQ, { email, password }).then(() => {
        this.$router.push('/table')
      })
    },
    switchVisibilityPassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  padding: 30px 60px;
  background: #fff;
  box-shadow: 0 0 31px 0 rgba(0, 0, 0, 0.4);
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    label {
      position: relative;
      span {
        position: absolute;
        transform: translate(0, -100%);
        cursor: pointer;
        top: 50%;
        right: 10px;
      }
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
