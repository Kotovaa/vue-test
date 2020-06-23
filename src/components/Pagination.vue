<template lang="pug">
  .pagination
    .pagination_arrows
      .pagination_prev(v-if="filt.offset > 0" @click="prev()")
        i.fa.fa-arrow-left
      p {{ getTotalItems.offset + 1 }}-{{ getTotalItems.limit + getTotalItems.offset }} из {{ getTotalItems.total }}
      .pagination_next(@click="next()")
        i.fa.fa-arrow-right
</template>

<script>
    import { GET_DATA_BY_FILTER } from "../store/types";

    export default {
        name: "Pagination",
        props: {
          filt: {
            type: Object,
            default: {
              limit: 10,
              offset: 0
            }
          }
        },
        computed: {
          getTotalItems() {
            return this.$store.getters.get_total
          },
        },
      methods: {
        prev() {
          this.filt.offset--
          this.$store.dispatch(GET_DATA_BY_FILTER, this.filt)
        },
        next() {
          this.filt.offset++
          this.$store.dispatch(GET_DATA_BY_FILTER, this.filt)
        }
      }
    }
</script>

<style scoped lang="scss">
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
    p {
      font-size: 14px;
      line-height: 17px;
      color: #152739;
      margin: 0 10px;
    }
    &_arrows {
      display: flex;
      flex-direction: row;
      > div { cursor: pointer }
    }
  }
</style>
