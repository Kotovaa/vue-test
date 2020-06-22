<template>
  <div class="table">
    <h1>TABLE</h1>
    <label>
      <input type="text" v-model="filt.search">
      <button @click="search()">Search</button>
    </label>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" class="table">
      <thead v-if="selected.length <= 0">
        <tr>
          <th><input type="checkbox" v-model="selectAll"></th>
          <th>order_id</th>
          <th>items</th>
          <th>create_date</th>
          <th>status</th>
          <th>is_paid</th>
          <th>is_shipped</th>
          <th>buyer</th>
          <th>shipping_method</th>
          <th>total_price</th>
        </tr>
      </thead>
      <thead v-if="selected.length > 0">
        <tr>
          <th><input type="checkbox" v-model="selectAll"></th>
          <th colspan="9">
            <button @click="refresh(selected)">обновить</button>
            <button @click="remove(selected)">удалить</button>
          </th>
        </tr>
      </thead>
      <template v-for="item in getTableData">
        <tbody>
        <tr :class="{ opened: opened.includes(item.id) }">
          <td><input type="checkbox" v-model="selected" :value="item.order_id"></td>
          <td>{{item.order_id}}</td>
          <td><span @click="toggle(item.id)">+</span>{{item.items.length}} товар</td>
          <td>{{formatDate(item.create_date)}}</td>
          <td>{{item.status}}</td>
          <td>{{item.is_paid}}</td>
          <td>{{item.is_shipped}}</td>
          <td>{{item.buyer}}</td>
          <td>{{item.shipping_method}}</td>
          <td>{{item.total_price}}</td>
        </tr>
        <tr v-if="item.items && opened.includes(item.id)">
          <td colspan="10">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" class="subtable">
              <thead>
              <tr>
                <th>Название</th>
                <th>Цена</th>
                <th>Стоимость</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="i in item.items">
                <td>{{i.title}}</td>
                <td>{{i.price}}</td>
                <td>{{i.sku}}</td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </template>
    </table>
    <button @click="logout">Выйти</button>
    <div class="pagination">
      Выести элементов
      <select v-model="filt.limit" @change="filterByLimit()">
        <option value="">Все</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <div class="pagination_arrows">
        <div class="pagination_prev" v-if="filt.offset > 0">
          <button @click="prev()"><</button>
        </div>
        <div class="pagination_next">
          <button @click="next()">></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {LOGOUT, GET_DATA, GET_DATA_BY_FILTER} from "../store/types";
  import moment from 'moment'

  export default {
    data() {
      return {
        opened: [],
        selected: [],
        filt: {
          limit: '',
          offset: 0,
          search: ''
        }
      }
    },
    computed: {
      getTableData() {
        return this.$store.getters.get_table_data
      },
      selectAll: {
        get: function() {
          return this.getTableData ? this.selected.length == this.getTableData.length : false
        },
        set: function (val) {
          let selected = [];

          if (val) {
            this.getTableData.forEach(i => {
              selected.push(i.order_id)
            })
          }
          this.selected = selected;
        }
      }
    },
    methods: {
      getData() {
        this.$store.dispatch(GET_DATA)
      },
      logout() {
        this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push('/')
        })
      },
      toggle(id) {
        const index = this.opened.indexOf(id);
        if (index > -1) {
          this.opened.splice(index, 1)
        } else {
          this.opened.push(id)
        }
      },
      formatDate(date) {
        return moment(date).format('DD-MM-YYYY')
      },
      search() {
        this.$store.dispatch(GET_DATA_BY_FILTER, this.filt)
      },
      refresh(ids) {
        console.log('Обновляю', ids)
      },
      remove(ids) {
        console.log('Удаляю', ids)
      },
      filterByLimit() {
        this.$store.dispatch(GET_DATA_BY_FILTER, this.filt)
      },
      prev() {
        this.filt.offset--
        this.$store.dispatch(GET_DATA_BY_FILTER, this.filt)
      },
      next() {
        this.filt.offset++
        this.$store.dispatch(GET_DATA_BY_FILTER, this.filt)
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>
<style scoped lang="scss">
  td {
    padding: 10px;
  }
  th {
    padding: 10px;
    border-bottom: 1px solid #000;
  }
  .subtable {
    background: #F6F9FC;
    th {
      font-size: 12px;
      line-height: 14px;
      text-align: center;
    }
  }
  .pagination_arrows {
    display: flex;
    flex-direction: row;
  }
</style>
