<template>
  <table class="table">
    <tr :key="key" v-for="(value, key) in data">
      <td>{{ key }}</td>
      <td>{{ value }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  })
</script>

<style lang="scss">
  .table {
  }
</style>
