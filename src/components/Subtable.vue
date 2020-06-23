<template lang="pug">
  table.subtable(
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  )
    thead
      tr
        th
          div Название
        th
          div Цена
        th
          div Стоимость
    tbody
      tr(v-for="i in items")
        td
          div {{ i.title }}
        td
          div {{ i.price }}
        td
          div {{ i.sku }}
</template>

<script>
    export default {
        name: "Subtable",
        props: ['items']
    }
</script>

<style scoped lang="scss">
  .subtable {
    padding-left: 63px;
    thead {
      background: #F6F9FC;
      tr {
        th {
          width: auto !important;
          &:first-child {
            div { padding-left: 98px; }
          }
          div {
            padding: 28px 0 18px;
            background: #F6F9FC;
            text-align: center;
          }
        }
      }
    }
    tbody {
      tr {
        &:last-child {
          td {
            div {
              margin-bottom: 20px;
            }
          }
        }
        td {
          width: auto !important;
          &:first-child {
            div { margin-left: 68px; }
          }
          div {
            margin-top: 0;
            font-size: 12px;
            line-height: 14px;
            color: #132739;
          }
        }
      }
    }
  }
</style>
