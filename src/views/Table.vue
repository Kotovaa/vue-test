<template>
  <div class="table">
    <h1>TABLE</h1>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
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
      <template v-for="item in getTableData">
        <tbody>
        <tr @click="toggle(item.id)" :class="{ opened: opened.includes(item.id) }">
          <td>{{item.order_id}}</td>
          <td>товары</td>
          <td>{{item.create_date}}</td>
          <td>{{item.status}}</td>
          <td>{{item.is_paid}}</td>
          <td>{{item.is_shipped}}</td>
          <td>{{item.buyer}}</td>
          <td>{{item.shipping_method}}</td>
          <td>{{item.total_price}}</td>
        </tr>
        <tr v-if="item.items && opened.includes(item.id)">
          <td colspan="9">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
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
  </div>
</template>
<script>
  import { LOGOUT, GET_DATA } from "../store/types";

  export default {
    data() {
      return {
        opened: []
      }
    },
    computed: {
      getTableData() {
        return this.$store.getters.get_table_data
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
</style>
