<template>
  <div class="share">
    <div class="share-tabs">
      <a
        :class="{ active: tabs[0].active }"
        href="#"
        class="share-tab"
        @click="setActive(0, $event)"
      >
        <ion-icon name="md-link" class="share-tab-icon" />
        <span class="share-tab-title">URL</span>
      </a>
      <a
        :class="{ active: tabs[1].active }"
        href="#"
        class="share-tab"
        @click="setActive(1, $event)"
      >
        <ion-icon name="ios-mail" class="share-tab-icon" />
        <span class="share-tab-title">EMAIL</span>
      </a>
    </div>
    <div class="share-contents">
      <div :class="{ active: tabs[0].active }" class="share-content">
        <span class="share-content-title">{{ $t('share_url') }}:</span>
        <div :class="{ done: copy.done }" class="share-content-wrapper">
          <div class="share-link-box">
            <span class="share-link-text">{{ copy.link }}</span>
            <input
              ref="link"
              :value="copy.link"
              type="text"
              class="share-link-input"
            />
          </div>
          <button class="share-content-button" @click="copyLink">
            <span v-show="!copy.done">{{ $t('copy') }}</span>
            <ion-icon
              v-show="copy.done"
              name="md-checkmark"
              class="share-content-icon"
            />
          </button>
        </div>
      </div>
      <div :class="{ active: tabs[1].active }" class="share-content">
        <span class="share-content-title">{{ $t('share_email') }}:</span>
        <div v-show="mail.error" class="share-error">
          {{ $t('share_email_error') }}
        </div>
        <div :class="{ done: mail.done }" class="share-content-wrapper">
          <input
            v-model="mail.model"
            type="text"
            placeholder="email@cliente.com"
            class="share-email-input"
          />
          <button class="share-content-button" @click="sendMail">
            <span v-show="!mail.done">{{ $t('send') }}</span>
            <ion-icon
              v-show="mail.done"
              name="md-checkmark"
              class="share-content-icon"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Service from '~/scripts/service.js'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    copy: {
      link: '',
      done: false
    },
    mail: {
      done: false,
      error: false,
      model: ''
    },
    tabs: [
      {
        active: true
      },
      {
        active: false
      }
    ]
  }),

  computed: {
    ...mapGetters({
      website: 'website/website'
    })
  },

  mounted() {
    this.setCopyLink()
  },

  methods: {
    async setCopyLink() {
      const uuid = this.website.uuid
      if (uuid) {
        const shareLinkData = await Service.getShareLink(uuid)
        this.copy.link = shareLinkData.result.url
      }
    },

    getShareEmail() {
      const { uuid } = this.website
      if (uuid) {
        Service.getShareEmail(uuid, this.mail.model)
      }
    },

    setActive(index, e) {
      e.preventDefault()
      this.tabs.map(el => (el.active = false))
      this.tabs[index].active = true
    },

    copyLink() {
      const vm = this
      const url = vm.$refs.link
      url.select()
      document.execCommand('copy')
      this.statusCompleted('copy')
    },

    async sendMail() {
      if (this.validate()) {
        await this.getShareEmail()
        this.mail.error = false
        this.statusCompleted('mail')
      } else {
        this.mail.error = true
      }
    },

    validate() {
      const regExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (regExp.test(this.mail.model)) {
        return true
      } else {
        return false
      }
    },

    statusCompleted(element) {
      switch (element) {
        case 'copy':
          this.copy.done = true
          setTimeout(() => (this.copy.done = false), 2000)
          break
        case 'mail':
          this.mail.done = true
          setTimeout(() => (this.mail.done = false), 2000)
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';
.share-tabs {
  margin: 16px 0 32px;
}
.share-tab {
  color: $dark-grey;
  text-decoration: none;
  margin: 0 14px;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  display: inline-flex;
  align-items: center;
  padding: 4px;
  &.active {
    border-bottom: 5px solid $primary;
  }
}

.share-tab-icon {
  font-size: 22px;
  margin-right: 8px;
}

.share-contents {
  font-weight: 100;
  color: $medium-grey;
  text-align: left;
}

.share-content {
  &:not(.active) {
    display: none;
  }
}

.share-content-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 45px;
  margin-top: 8px;
  &.done {
    .share-link-box,
    .share-email-input {
      border-color: $primary;
      color: $primary;
    }
  }
}

.share-content-title {
  font-size: 15px;
}

.share-link-box {
  border: 1px solid $border-grey;
  background-color: $white;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  padding: 5px 0 5px 16px;
  font-size: 15px;
  position: relative;
}

.share-content-button {
  background-color: $primary;
  color: $white;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  text-transform: uppercase;
  width: 120px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-email-input {
  flex: 1 1 auto;
  border: 1px solid $border-grey;
  padding-left: 16px;
  font-size: 15px;
  font-family: $corporate-font;
  color: $dark-grey;
  &::placeholder {
    color: #c5c5c5;
  }
}

.share-content-icon {
  color: #f7f7f7;
  font-weight: 500;
  font-size: 22px;
}

.share-error {
  border: 1px solid $danger;
  color: $danger;
  background-color: $white;
  font-size: 15px;
  line-height: 24px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0 18px;
}
.share-link-input {
  position: absolute;
  z-index: -1;
  left: 5px;
  top: 5px;
}
</style>
