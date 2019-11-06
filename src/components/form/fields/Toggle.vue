<template>
  <div :class="{ undeditable: !editable }" class="toggle-button-wrapper">
    <div
      :class="{ enabled: formatEnabled }"
      :style="{ minWidth: customWidth + 'px' }"
      class="toggle-button"
      @click="updateStatus"
    >
      <input v-model="model.enabled" type="checkbox" class="toggle-checkbox" />
      <span class="toggle-button-core">
        <ion-icon v-if="icon" :name="icon" class="toggle-icon" />
      </span>
      <div class="toggle-button-label">
        <span class="toggle-button-label-enabled">{{ labelEnabled }}</span>
        <span class="toggle-button-label-disabled">{{ labelDisabled }}</span>
      </div>
    </div>
    <span v-if="hasQuestion" class="toggle-button-question">{{
      question
    }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    customWidth: {
      type: Number,
      default: 70
    },
    id: {
      type: String,
      required: true
    },
    labelEnabled: {
      type: String,
      default: 'si'
    },
    labelDisabled: {
      type: String,
      default: 'no'
    },
    question: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    editable: false,
    model: {
      enabled: false
    }
  }),
  computed: {
    ...mapGetters({
      analysisField: 'form/analysisField',
      analysisBlock: 'form/analysisBlock'
    }),
    formatEnabled() {
      if (!this.model.enabled || this.model.enabled === 'desactive') {
        return false
      }
      if (this.model.enabled === true || this.model.enabled === 'active') {
        return true
      }
      return false
    },
    hasQuestion() {
      if (this.question === null || this.question === undefined) {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    this.setModel()
  },
  methods: {
    updateStatus() {
      this.model.enabled = !this.model.enabled
      this.emitStatus()
    },
    resetData() {
      this.model.enabled = false
      this.emitStatus()
    },
    emitStatus() {
      this.$emit('enabledButton', {
        enabled: this.model.enabled,
        id: this.id
      })
    },
    setModel() {
      if (this.analysisField(this.id) !== undefined) {
        this.model.enabled = this.analysisField(this.id).value
      } else if (this.analysisBlock(this.id) !== undefined) {
        this.editable = this.analysisBlock(this.id).editable
        this.model.enabled = this.analysisBlock(this.id).value
      } else {
        this.model.enabled = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.toggle-button-wrapper {
  display: flex;
  align-items: center;
}
.toggle-button {
  display: inline-block;
  height: 34px;
  border-radius: 17px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  &.enabled {
    .toggle-button-core {
      background-color: $dark-grey;
      &:after {
        right: 4px;
        left: auto;
        transition: right 0.35s;
      }
    }
    .toggle-button-label-enabled {
      display: inline;
    }
    .toggle-button-label-disabled {
      display: none;
    }
    .toggle-icon {
      right: 8px;
      left: auto;
    }
  }
}

.toggle-button-question {
  margin-left: 24px;
  color: #7a7a7a;
  font-size: 14px;
  text-align: left;
}

.toggle-button-core {
  width: 100%;
  display: inline-block;
  height: 100%;
  position: relative;
  background-color: $border-grey;
  transition: background-color 0.1s linear;
  &:after {
    content: '';
    height: 26px;
    width: 26px;
    border-radius: 50%;
    background: $white;
    position: absolute;
    left: 4px;
    top: 4px;
    transition: left 0.35s;
  }
}

.toggle-button-label {
  color: $white;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-weight: 600;
}

.toggle-button-label-enabled {
  position: absolute;
  left: 14px;
  top: 8px;
  display: none;
}

.toggle-button-label-disabled {
  position: absolute;
  right: 14px;
  top: 8px;
}

.toggle-checkbox {
  display: none;
}

.toggle-icon {
  color: $dark-grey;
  position: absolute;
  left: 8px;
  right: auto;
  top: 8px;
  z-index: 2;
}
</style>
