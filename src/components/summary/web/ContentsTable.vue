<template>
  <table class="contents-table">
    <thead class="sr-only">
      <tr>
        <th>Type of content</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(elem, index) in list"
        :key="'contents' + index"
        class="contents-table-row"
      >
        <td class="contents-table-name">
          <span>{{ elem.name }}</span>
        </td>
        <td class="contents-table-check">
          <ion-icon :name="setIcon(elem.check)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: this.$t('products_catalog'),
          check: false,
          key: 'catalog'
        },
        {
          name: this.$t('wide_desc'),
          check: false,
          key: 'description'
        },
        {
          name: this.$t('products_images'),
          check: false,
          key: 'picture'
        },
        {
          name: this.$t('blog'),
          check: false,
          key: 'blog'
        },
        {
          name: this.$t('videos'),
          check: false,
          key: 'video'
        }
      ]
    }
  },
  methods: {
    setIcon: value => (value ? 'md-checkmark' : 'md-close'),
    setInitialData(data) {
      this.list.forEach(element => {
        element.check = data[element.key].value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.contents-table {
  color: $white;
  margin: 50px auto 0;
  min-width: 470px;
}
.contents-table-name {
  font: {
    size: 22px;
    weight: 600;
  }
  text-transform: uppercase;
  letter-spacing: 1px;
}
.contents-table-check {
  font-size: 28px;
}
ion-icon,
.contents-table-name span {
  vertical-align: middle;
}
</style>
