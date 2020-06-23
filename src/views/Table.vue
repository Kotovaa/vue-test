<template lang="pug">
  .table
    .table__head
      h1 Таблица заказов
      .table__head_btns
        button.table__head_send.table__head_btn(type="button") Отправления
        button.table__head_export.table__head_btn(type="button") Экспортировать
    .table__filter
      button(@click="search()") Фильтр
      label
        input(
          type="text"
          v-model="filt.search"
        )
        i.fa.fa-search
    table(
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
    )
      thead(v-if="selected.length <= 0")
        tr
          th
            div
              input(
                type="checkbox"
                v-model="selectAll"
                id="selectAll1"
              )
              label(for="selectAll1")
            - var thItems = ["order_id", "items", "create_date", "status", "is_paid", "is_shipped", "buyer", "shipping_method", "total_price"]
            each thItem in thItems
              th= thItem
      thead(v-if="selected.length > 0")
        tr
          th
            div
              input(
                type="checkbox"
                v-model="selectAll"
                id="selectAll"
              )
              label(for="selectAll")
          th(colspan="9")
            div
              button(@click="refresh(selected)") Обновить
              button(@click="remove(selected)") Удалить
      tbody
        template(
          lang="pug"
          v-for="item in getTableData"
        )
          tr(
            :class="{ opened: opened.includes(item.id) }"
          )
            td
             div
                input(
                  type="checkbox"
                  v-model="selected"
                  :value="item.order_id"
                  :id="item.id"
                )
                label(:for="item.id")
            td
              div {{ item.order_id }}
            td
              div.open_items(@click="toggle(item.id)")
                span +
                p {{ item.items.length }} товар
            td
              div {{ formatDate(item.create_date) }}
            td
              div {{ item.status }}
            td
              div
                i.fa(:class="[item.is_paid ? 'fa-check-circle' : 'fa-circle-o']")
            td
              div
                 i.fa(:class="[item.is_shipped ? 'fa-check-circle' : 'fa-circle']")
            td
              div {{ item.buyer }}
            td
              div {{ item.shipping_method }}
            td
              div ${{ item.total_price }}
          tr(v-if="item.items && opened.includes(item.id)")
            td(colspan="10")
              Subtable(:items="item.items")
    Pagination(:filt="filt")
</template>
<script>
  import {GET_DATA, GET_DATA_BY_FILTER} from "../store/types";
  import moment from 'moment'
  import Pagination from '@/components/Pagination'
  import Subtable from '@/components/Subtable'

  export default {
    components: {
      Pagination,
      Subtable
    },
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
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>
<style lang="scss">
  .table {
    background: #F6F9FC;
    padding: 33px 30px;
    &__head {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      &_btns {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      &_btn {
        height: 32px;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        line-height: 32px;
        color: #fff;
        font-weight: 500;
        text-transform: uppercase;
        border: 0;
        cursor: pointer;
      }
      &_send {
        background: #0F1B25;
      }
      &_export {
        background: #3CC8AE;
        margin-left: 10px;
      }
    }
    &__filter {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: 41px 0 21px;
      button {
        background: #132739;
        height: 52px;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        line-height: 52px;
        text-transform: uppercase;
        border: 0;
        margin-right: 29px;
      }
      label {
        height: 52px;
        width: 100%;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          border: 1px solid #C5C7CD;
          background: #fff;
          padding-left: 15px;
        }
        svg {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
    }
    table {
      thead {
        background: #FFFFFF;
        th {
          color: rgba(19,39,57, .5);
          font-size: 12px;
          line-height: 14px;
          text-align: left;
          &:first-child {
            width: 90px;
          }
          div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            height: 57px;
            background: #fff;
          }
          &:first-child {
            padding-left: 20px;
          }
        }
      }
      tbody {
        margin-top: 20px;
        tr {
          &:first-child {
            div {
              margin-top: 20px;
            }
          }
          td {
            vertical-align: middle;
            text-align: center;
            &:first-child {
              width: 90px;
              div {
                padding-left: 20px;
              }
            }
            div {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              height: 57px;
              background: #fff;
              font-size: 12px;
              line-height: 14px;
              color: #132739;
              &.open_items {
                cursor: pointer;
              }
            }
          }
        }
      }
      label {
        position: relative;
        cursor: pointer;
        &:before {
          content:'';
          -webkit-appearance: none;
          background-color: transparent;
          border: 1px solid #C5C7CD;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
          padding: 10px;
          display: inline-block;
          position: relative;
          vertical-align: middle;
          cursor: pointer;
          margin-right: 5px;
        }
      }
      input {
        padding: 0;
        margin-bottom: 0;
        display: none;
        cursor: pointer;
        &:checked + label:after {
          content: '';
          display: block;
          position: absolute;
          top: 2px;
          left: 9px;
          width: 6px;
          height: 14px;
          border: solid #152739;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }
    }
    h1 {
      color: #152739;
      font-size: 36px;
      line-height: 43px;
    }
  }
  *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

</style>
