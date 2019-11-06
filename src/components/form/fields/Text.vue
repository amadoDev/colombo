<template>
  <div :class="{ error: error }" class="form-field">
    <label for="input-field" class="form-field-label">{{ label }}</label>
    <input
      v-model="model.text"
      :placeholder="placeholder"
      type="text"
      name="input-field"
      class="form-field-input"
      @input="updateStatus"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    model: {
      text: ''
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
      this.model.text = this.analysisField(this.id).value
    },
    updateStatus() {
      this.$emit('textChange', { id: this.id, text: this.model.text })
    },
    resetData() {
      this.model.text = ''
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
    label {
      color: $danger;
    }
    input {
      border-color: $danger;
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

.form-field-input {
  background-color: $white;
  border: 1px solid $border-grey;
  width: 100%;
  height: 40px;
  text-indent: 16px;
  border-radius: 2px;
  &::placeholder {
    color: #c5c5c5;
  }
}
</style>
