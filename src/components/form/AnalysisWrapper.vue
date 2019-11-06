<template>
  <form :style="{ width: width + 'px' }" class="analysis-form-wrapper">
    <span class="analysis-form-title">{{ title }}</span>
    <div class="analysis-form-body">
      <slot />
    </div>
    <div class="analysis-form-buttons">
      <button
        v-show="showReset"
        type="button"
        class="button analysis-form-delete"
        @click="removeData($event)"
      >
        {{ $t('erase_data') }}
      </button>
      <button
        type="submit"
        class="button analysis-form-save"
        @click="saveData($event)"
      >
        {{ $t('save') }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Responde a las preguntas'
    },
    width: {
      type: Number,
      default: 400
    }
  },
  computed: {
    ...mapGetters({
      showModule: 'controllers/showModule'
    }),
    showReset() {
      return this.showModule('showReset')
    }
  },
  methods: {
    ...mapActions({
      saveModuleState: 'controllers/saveModuleState'
    }),
    saveData(e) {
      e.preventDefault()
      this.$emit('saveData')
    },
    removeData(e) {
      e.preventDefault()
      this.$emit('removeData')
      this.saveModuleState({ element: 'showReset', show: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.analysis-form-wrapper {
  display: inline-block;
  background-color: $light-grey;
  box-shadow: 1px 1px 10px 0px rgba(42, 45, 49, 1);
  border-radius: 2px;
}
.analysis-form-title {
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
.analysis-form-body {
  padding: 20px 24px;
}
.analysis-form-buttons {
  display: flex;
  height: 54px;
  .button {
    flex: 1 1;
    color: $light-grey;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
  }
}
.analysis-form-delete {
  background-color: $border-grey;
}
.analysis-form-save {
  background-color: $primary;
  &:hover,
  &:focus {
    background-color: darken($primary, 10%);
  }
}
</style>
