<template>
  <div class="navigation">
    <nuxt-link :to="localePath(routeTo)" class="navigation-link">
      <ion-icon name="md-arrow-round-back" class="navigation-icon" />
      <span>{{ $t(routeText) }}</span>
    </nuxt-link>
    <a :href="websiteUrl" target="_blank" class="navigation-site">{{
      websiteName
    }}</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    routeTo: {
      type: String,
      required: true
    },
    routeText: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      website: 'website/website'
    }),
    websiteName() {
      return this.website.url
    },
    websiteUrl() {
      return `http://${this.website.url}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.navigation {
  width: 100%;
  margin-top: 60px;
  text-align: left;
  padding: 26px 0;
  z-index: 10;
  position: relative;
}
.navigation-link {
  color: $white;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}
.navigation-site {
  color: $white;
  text-decoration: none;
  float: right;
  font-size: 14px;
  font-weight: 600;
}
.navigation-icon {
  visibility: visible;
  margin-right: 2px;
}
</style>
