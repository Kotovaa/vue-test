import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

import {
  AUTH_ERR,
  AUTH_REQ,
  AUTH_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN,
  GET_DATA
} from "./types";

const get_tokens_url = 'https://zonesmart.su/api/auth/jwt/create/'
const refresh_token_url = 'https://zonesmart.su/api/auth/jwt/refresh/'
const get_table_data = 'https://zonesmart.su/api/v1/zonesmart/order/'
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    error: '',
    table_items: {}
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
    },
    [GET_DATA]: (state, payload) => {
      state.table_items = payload
    }
  },
  actions: {
    [AUTH_REQ]: async ({ commit }, user) => {
      commit(AUTH_REQ)
      await axios({ url: get_tokens_url, data: user, method: 'POST' })
        .then(resp => {
          const accessToken = resp.data.access
          const refreshToken = resp.data.refresh
          localStorage.setItem('user-token', accessToken)
          localStorage.setItem('refresh-token', refreshToken)
          axios.defaults.headers.common['Authorization'] = `JWT ${accessToken}`
          commit(AUTH_SUCCESS, accessToken)
        })
        .catch(e => {
          console.log(e)
          commit(AUTH_ERR, e)
          localStorage.removeItem('user-token')
        })
    },
    [LOGOUT]: ({ commit }) => {
      commit(LOGOUT)
      localStorage.removeItem('user-token')
      delete axios.defaults.headers.common['Authorization']
    },
    [REFRESH_TOKEN]: async ({ commit }) => {
      commit(REFRESH_TOKEN)
      let options = {
        refresh: localStorage.getItem('refresh-token')
      }
      await axios({ url: refresh_token_url, data: options, method: 'POST' })
        .then(resp => {
          const accessToken = resp.data.access
          localStorage.setItem('user-token', accessToken)
          commit(AUTH_SUCCESS, accessToken)
        })
    },
    [GET_DATA]: async ({ commit }) => {
      const config = {
        headers: { 'Authorization': `JWT ${localStorage.getItem('user-token')}` },
        params: {
          limit: '',
          offset: '',
          search: ''
        }
      }
      await axios.get(get_table_data, config)
        .then(resp => {
          commit(GET_DATA, resp.data.results)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  getters: {
    is_authenticated: state => !!state.token,
    auth_status: state => state.status,
    get_error: state => state.error,
    get_table_data: state => state.table_items
  },
  modules: {
  },
});
