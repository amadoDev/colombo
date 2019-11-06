<template>
  <div class="container">
    <span class="error-title">Error {{ error.statusCode }}</span>
    <p class="error-text">{{ errorText }}</p>
    <nuxt-link :to="button.to" class="go-to-home-button">
      {{ button.text }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],

  layout: 'cover',

  data() {
    return {
      texts: {
        notFound: this.$t('page_not_found'),
        expiredReport: this.$t('expired_report'),
        defaultError: this.$t('an_error_occured')
      },
      button: {
        to: '/',
        text: this.$t('go_to_home')
      }
    }
  },

  computed: {
    errorText() {
      let text = ''
      switch (this.error.statusCode) {
        case 404:
          text = this.texts.notFound
          break
        case 410:
          text = this.texts.expiredReport
          break
        default:
          text = this.texts.defaultError
          break
      }
      return text
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/css/vars';

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $white;
}
.error-title {
  font-size: 34px;
  font-weight: 600;
  letter-spacing: 1px;
}
.error-text {
  margin-top: 28px;
}
.go-to-home-button {
  margin-top: 50px;
  background-color: $primary;
  color: $white;
  height: 45px;
  width: 145px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
