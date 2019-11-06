<template>
  <div
    v-click-outside="closeSuggestions"
    :class="{ error: error, active: isActive }"
    class="form-field"
  >
    <label for="input-field" class="form-field-label">{{ label }}</label>
    <div class="form-suggestions-wapper">
      <input
        v-scroll-to="'#form-search'"
        :value="model.input"
        :placeholder="placeholder"
        :disabled="disabled"
        class="form-input"
        type="text"
        @keyup="checkShowSuggestions($event)"
      />
      <ul v-show="parsedSuggestions.display" class="form-suggestions-list">
        <li
          v-for="(suggestion, index) in parsedSuggestions.data"
          :key="'suggestion' + index"
          class="form-suggestions-item"
        >
          <a
            :data-value="suggestion.value"
            :data-ref="suggestion.refNumber"
            href=""
            @click="setModel($event)"
            v-html="suggestion.parsed"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ClickOutside from 'vue-click-outside'
import ScrollTo from 'vue-scrollto'

let timeout = null

class Suggestion {
  constructor(value, refNumber, parsed = '') {
    this.value = value
    this.refNumber = refNumber
    this.parsed = parsed
  }
}

export default {
  directives: {
    ClickOutside,
    ScrollTo
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    suggestions: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    error: false,
    parsedSuggestions: {
      data: [],
      display: false
    },
    model: {
      input: ''
    }
  }),
  computed: {
    ...mapGetters({
      analysisField: 'form/analysisField'
    }),
    isActive() {
      return this.parsedSuggestions.display
    }
  },
  mounted() {
    this.setInitialModel()
  },

  methods: {
    setInitialModel() {
      this.model.input = this.analysisField(this.id).value
    },
    checkShowSuggestions(e) {
      this.model.input = e.target.value
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (this.model.input.length > 2) {
          this.emitEvent()
        } else {
          this.parsedSuggestions.display = false
        }
      }, 500)
    },
    emitEvent() {
      this.$emit('getSuggestions', this.model.input)
    },
    showSuggestions() {
      const parsedSuggestions = this.enhanceTyped(this.suggestions)
      this.parsedSuggestions.data = []
      this.suggestions.forEach((suggestion, index) => {
        this.parsedSuggestions.data.push(
          new Suggestion(
            suggestion.value,
            suggestion.refNumber,
            parsedSuggestions[index]
          )
        )
      })
      this.parsedSuggestions.display = true
    },
    enhanceTyped(arr) {
      const result = []
      const substr = this.model.input.toLowerCase()
      arr.forEach(el => {
        result.push(
          el.value
            .toLowerCase()
            .replace(
              `${substr}`,
              `<span style="color:#232323">${substr}</span>`
            )
        )
      })
      return result
    },
    closeSuggestions() {
      this.parsedSuggestions.display = false
    },
    setModel(e) {
      e.stopPropagation()
      e.preventDefault()
      this.model.input = e.currentTarget.getAttribute('data-value')
      const refNumber = e.currentTarget.getAttribute('data-ref')
      this.$emit('pickedValue', {
        picked: this.model.input,
        id: this.id,
        ref: refNumber
      })
      this.closeSuggestions()
    },
    validate(state) {
      this.error = !state
    },
    resetData() {
      this.model.input = ''
      this.$emit('pickedValue', {
        picked: this.model.input,
        id: this.id,
        ref: '0'
      })
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
    .form-input {
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

.form-input {
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

.form-suggestions-wapper {
  position: relative;
}

.form-suggestions-list {
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 1;
  border-top: 0;
  max-height: 212px;
  overflow-y: auto;
  border: 1px solid #ebebeb;
  border-top: 0;
}

.form-suggestions-item {
  background-color: $white;
  color: #7a7a7a;
  font-size: 14px;
  border-top: 1px solid #ebebeb;
  &:hover {
    background-color: #fbfbfb;
  }
  &:first-child {
    border-top: 0;
  }
  a {
    padding: 10px 20px;
    display: block;
    color: inherit;
    text-decoration: none;
  }
}
</style>
