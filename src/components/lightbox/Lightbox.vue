<template>
  <div
    :class="{ opened: opened }"
    class="lightbox-wrapper"
    @click="close($event)"
  >
    <span class="lightbox-back-link" @click="close($event)">
      <ion-icon name="md-arrow-round-back" class="navigation-icon" />
      {{ $t('back') }}
    </span>
    <div class="lightbox">
      <span v-if="title" class="lightbox-title">{{ title }}</span>
      <div class="lightbox-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },

  data: () => ({
    opened: false
  }),

  watch: {
    opened: function(newVal, oldVal) {
      if (newVal === true && newVal !== oldVal) {
        this.hideWindowScroll()
      } else {
        this.showWindowScroll()
      }
    }
  },

  methods: {
    close(e) {
      if (
        e.target.className === 'lightbox-wrapper opened' ||
        e.target.className === 'lightbox-back-link'
      ) {
        this.opened = false
      }
    },

    open() {
      this.opened = true
    },

    hideWindowScroll() {
      document.body.classList.add('hide-scroll')
    },

    showWindowScroll() {
      document.body.classList.remove('hide-scroll')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.lightbox-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: $dark-grey;
    opacity: 0.9;
  }
  &:not(.opened) {
    opacity: 0;
    z-index: -1;
  }
  &.opened {
    transition: opacity 0.2s;
    opacity: 1;
  }
}
.lightbox {
  width: 520px;
  display: inline-block;
  background-color: $light-grey;
  z-index: 4;
  border-radius: 2px;
}
.lightbox-title {
  width: 100%;
  height: 54px;
  background-color: $black;
  color: $white;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.lightbox-body {
  padding: 26px;
}
.lightbox-back-link {
  cursor: pointer;
  color: $white;
  z-index: 1;
  position: absolute;
  top: 86px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  transform: translateX(-516px);
  ion-icon {
    visibility: visible;
    margin-right: 2px;
  }
}
</style>
