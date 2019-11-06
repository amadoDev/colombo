<template>
  <div :class="{ error: error }" class="form-field">
    <span class="form-field-label">{{ label }}</span>
    <div class="radio-group">
      <div v-for="(option, index) in options" :key="index" class="radio-item">
        <input
          :id="'radio' + index"
          v-model="model.picked"
          :value="option.value"
          :name="option.name"
          type="radio"
          class="radio-input"
          @click="updateStatus(option.value)"
        />
        <label :for="'radio' + index" class="radio-label">{{
          option.value
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    label: {
      type: String,
      default: 'Seleccionar'
    },
    options: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    model: {
      picked: ''
    },
    error: false
  }),
  computed: {
    ...mapGetters({
      analysisField: 'form/analysisField'
    })
  },
  mounted() {
    this.setModel()
  },
  methods: {
    setModel() {
      this.model.picked = this.analysisField(this.id).value
    },
    updateStatus(picked) {
      this.$emit('pickedValue', { picked: picked, id: this.id })
    },
    resetData() {
      this.model.picked = ''
      this.updateStatus()
    },
    validate(state) {
      this.error = !state
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.form-field {
  text-align: left;
  &.error {
    .form-field-label {
      color: $danger;
    }
  }
}
.form-field-label {
  color: #7a7a7a;
  font-size: 14px;
  line-height: 24px;
  display: inline-block;
  margin-bottom: 6px;
}
.radio-group {
  display: flex;
}
.radio-input {
  display: none;
  &:checked {
    + label {
      background-color: $dark-grey;
    }
  }
}
.radio-label {
  background-color: $border-grey;
  color: $white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin-right: 16px;
  cursor: pointer;
}
</style>
