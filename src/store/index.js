import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

import {
  AUTH_ERR,
  AUTH_REQ,
  AUTH_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN
} from "./types";

const get_tokens_url = 'https://zonesmart.su/api/auth/jwt/create/'
const refresh_token_url = 'https://zonesmart.su/api/auth/jwt/refresh/'
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    error: ''
  },
  mutations: {
    [AUTH_REQ]: (state) => {
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'SUCCESS'
      state.error = ''
      state.token = token
    },
    [AUTH_ERR]: (state, error) => {
      state.status = 'error'
      state.error = error
    },
    [LOGOUT]: state => {
      state.token = ""
    },
    [REFRESH_TOKEN]: (state) => {
      state.status = 'refresh'
    }
  },
  actions: {
    [AUTH_REQ]: async ({ commit, dispatch }, user) => {
      commit(AUTH_REQ)
      await axios({ url: get_tokens_url, data: user, method: 'POST' })
        .then(resp => {
          const accessToken = resp.data.access
          const refreshToken = resp.data.refresh
          localStorage.setItem('user-token', accessToken)
          localStorage.setItem('refresh-token', refreshToken)
          axios.defaults.headers.common['Authorization'] = accessToken
          commit(AUTH_SUCCESS, accessToken)
        })
        .catch(e => {
          console.log(e)
          commit(AUTH_ERR, e)
          localStorage.removeItem('user-token')
        })
    },
    [LOGOUT]: ({ commit, dispatch }) => {
      commit(LOGOUT)
      localStorage.removeItem('user-token')
      delete axios.defaults.headers.common['Authorization']
    },
    [REFRESH_TOKEN]: ({ commit, dispatch }) => {
      commit(REFRESH_TOKEN)
      let options = {
        refresh: localStorage.getItem('refresh-token')
      }
      axios({ url: refresh_token_url, data: options, method: 'POST' })
        .then(resp => {
          const accessToken = resp.data.access
          localStorage.setItem('user-token', accessToken)
          commit(AUTH_SUCCESS, accessToken)
        })
    }
  },
  getters: {
    is_authenticated: state => !!state.token,
    auth_status: state => state.status,
    get_error: state => state.error
  },
  modules: {
  },
});
