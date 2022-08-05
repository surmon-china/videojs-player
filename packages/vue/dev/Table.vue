<template>
  <table class="table">
    <tr :key="key" v-for="(value, key) in data">
      <td>{{ key }}</td>
      <td>{{ normalizeValue(value) }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
  import { defineComponent, toRaw } from 'vue'
  export default defineComponent({
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    setup() {
      return {
        normalizeValue(value: any) {
          return String(toRaw(value))
        }
      }
    }
  })
</script>

<style lang="scss">
  .table {
  }
</style>
