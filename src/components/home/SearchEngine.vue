<template>
  <form class="search-bar">
    <div :class="{ error: error }" class="search-field">
      <label for="search" class="search-label">{{ $t('url_analyze') }}</label>
      <input
        v-model="model.url"
        type="text"
        name="search"
        placeholder="https://www.nombredelaweb.com"
        class="search-input"
      />
    </div>
    <button type="submit" class="search-button" @click="search($event)">
      {{ $t('search') }}
    </button>
  </form>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters, mapActions } from 'vuex'
import * as service from '~/scripts/service.js'

export default {
  data: () => ({
    model: {
      url: ''
    },
    error: false
  }),
  computed: {
    ...mapGetters({
      website: 'website/website'
    })
  },
  methods: {
    ...mapActions({
      saveWebsite: 'website/saveWebsite',
      resetStore: 'resetStore'
    }),
    async search(e) {
      e.preventDefault()
      const parsedURL = this.model.url
        .replace('https://', '')
        .replace('http://', '')
      if (this.validate()) {
        if (parsedURL !== this.website.url) {
          this.$nuxt.$loading.start()
          const { result, status } = await service.getUUID(parsedURL)
          if (status === 'OK') {
            this.resetStore()
            this.saveWebsite({
              url: parsedURL,
              uuid: result.uuid
            })
            service.setFormFields(result.uuid, {
              url: parsedURL
            })
          }
        }
        console.log(this.website.uuid)
        this.redirect()
      }
    },
    validate() {
      const regExp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
      if (!regExp.test(this.model.url)) {
        this.error = true
        return false
      } else {
        this.error = false
        return true
      }
    },
    redirect() {
      setTimeout(() => {
        this.$router.push(this.localePath('analysis'))
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.search-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .search-field {
    width: 550px;
    &.error {
      .search-label {
        color: $danger;
      }
      .search-input {
        border: 1px solid $danger;
      }
    }
  }
  .search-label {
    color: $white;
    line-height: 24px;
    font-size: 28px;
    display: block;
    margin-bottom: 30px;
    text-align: left;
    font-weight: 600;
  }
  .search-input {
    width: 100%;
    height: 45px;
    background-color: $white;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    text-indent: 16px;
    font-size: 15px;
    font-family: $corporate-font;
    line-height: 24px;
    &::placeholder {
      color: #d6d6d6;
    }
  }
  .search-button {
    color: $white;
    background-color: $primary;
    width: 145px;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    height: 45px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: auto;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: darken($primary, 10%);
    }
  }
}
</style>
