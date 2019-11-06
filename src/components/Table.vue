<template>
  <table class="table">
    <thead v-if="headers">
      <tr>
        <th v-for="(head, index) in headers" :key="'header' + index">
          <span v-html="head" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="'row' + i">
        <td
          v-for="(cell, j) in row"
          :key="'cell' + j"
          :class="{ 'cell-chart': typeof cell === 'object' }"
        >
          <slot :value="cell" name="chart">
            <span v-text="cell" />
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default() {
        return []
      }
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.table {
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
}
th {
  background-color: $black;
  color: $white;
  text-align: center;
  font: {
    size: 15px;
    weight: 600;
  }
  &:first-child {
    text-align: left;
  }
}
td {
  color: $primary;
  text-align: center;
  border-left: 1px solid #ededed;
  font: {
    size: 24px;
    weight: 600;
  }
  &:first-child {
    font-size: 15px;
    color: $dark-grey;
    text-align: left;
    border: 0;
  }
}
td,
th {
  height: 70px;
  padding: 0 28px;
}
.cell-chart {
  width: 200px;
  padding: 0 10px;
}
tbody {
  tr {
    background-color: $white;
    &:nth-child(even) {
      background-color: $light-grey;
    }
  }
}
.table.seo-table-detail {
  table-layout: auto;
  th {
    &:first-child {
      width: 410px;
    }
  }
}
</style>
