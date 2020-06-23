<template lang="pug">
  .table__filter
    button(@click="search()") Фильтр
    label
      input(
        type="text"
        v-model="filt.search"
      )
      i.fa.fa-search
</template>

<script>
    import {GET_DATA_BY_FILTER} from "../store/types";

    export default {
        name: "TableSearch",
        props: {
          filt: {
            type: Object,
            default: {
              search: ''
            }
          }
        },
      methods: {
        search() {
          this.$store.dispatch(GET_DATA_BY_FILTER, this.filt)
        }
      }
    }
</script>

<style scoped lang="scss">
  .table__filter {
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
</style>
