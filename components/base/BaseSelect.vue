<template>
  <div :class="selectClasses" :style="disabled ? 'pointer-events: none; ' : ''">
    <div class="custom-select-component__overlay" v-if="opened" @click="hideSelect($event)"></div>
    <div class="custom-select-component__block" role="button" @click="openSelect">
      <div class="custom-select-component__preview-label" v-if="label">
        {{ label }}
      </div>
      <div class="custom-select-component__preview-text-block" v-if="inputType === 'text' || selected.length === 0">
        <span class="custom-select-component__preview-text">{{ selectText }}</span>
      </div>
      <div class="custom-select-component-preview-tags" v-else-if="inputType === 'tags'">
        <div class="custom-select-component-preview-tags__item" v-for="(item) of selected" @click="removeOption(item)">
          {{ optionsArray[item]['label'] }}
        </div>
      </div>
    </div>
    <div class="custom-select-component__block-options">
      <div v-if="isSearchable" class="custom-select-component__search-area">
        <input v-model="searchReq" type="text" class="custom-select-component__search-input">
      </div>
      <div class="custom-select-component__options">
        <div
          v-for="(option, index) in dynamicsOptions"
          :key="`select-option_${index}`"
          @click="optionSelect(option.idx, $event)"
          :class="{
            'custom-select-component__option': true,
            'custom-select-component__option_locked': option.locked,
            'active': option.selected
          }"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "BaseSelect",
  emits: ['changed', 'input', 'update:value'],
  props: {
    value: [Object, Array, String, Number],
    options: [Array, Function],
    limits: {
      type: Number,
      default: 0
    },
    cache: {
      type: [String],
      default: null
    },
    cacheMs: {
      type: Number,
      default: undefined
    },
    placeholder: String,
    multiselect: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: undefined
    },
    inputType: {
      type: String,
      default: 'text'
    },
    label: String,
    queryParam: String,
    removableSelection: {
      type: Boolean,
      default: false,
    },
    design: {
      type: [String, Array],
      default: null,
    },
    disabled:{
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    selected: [],
    opened: false,
    searchReq: '',
  }),
  computed: {
    queryParams() {
      return this.$route?.query
    },
    optionsArray() {
      let result = []
      if (Array.isArray(this.options)) {
        result = this.options
      } else if (typeof this.options === 'function') {
        // TODO async options
      }
      result = result.map(el => {
        let item = el
        if (!_.isObject(el)) {
          item = {
            label: el,
            value: el,
          }
        }
        return item
      })
      return result
    },
    dynamicsOptions() {
      let options = _.cloneDeep(this.optionsArray)
      options = options?.map((el, idx) => {
        el.idx = idx
        if (this.selected.includes(idx)) {
          el.selected = true
        }
        return el
      })
      if (this.searchReq) {
        options = options?.filter(el => {
          return !!(el.label.toLowerCase().indexOf(this.searchReq.toLowerCase()) + 1);
        })
      }
      return options
    },
    selectText() {
      if (this.selected.length > 0) {
        let text = ''
        for (let item of this.selected) {
          if (text.length > 1) {
            text = `${text}, `
          }
          text = `${text}${this.optionsArray[item]?.shortName ? this.optionsArray[item]?.shortName : this.optionsArray[item]?.label}`
        }
        return text
      } else if (this.placeholder) {
        return this.placeholder
      } else {
        if (this.isMultiselect) {
          return 'Select value(one ore more)'
        }
        return 'Select value'
      }
    },
    isMultiselect() {
      return this.multiselect !== false
    },
    isSearchable() {
      return false
      if (this.searchable === undefined && this.options?.length > 5 || this.searchable) return true
    },
    selectClasses() {
      let classes = ['custom-select-component']
      let designList = Array.isArray(this.design) ? this.design : typeof this.design === 'string' ? [this.design] : []
      designList.forEach(el => classes.push(`custom-select-component_design_${el}`))
      if (this.opened) classes.push('active')
      return classes.join(' ')
    },
  },
  methods: {
    setSelected(data) {
      if (!Array.isArray(data)) {
        data = [data]
      }
      this.selected = data
    },
    addOption(data) {
      if (!this.isMultiselect) {
        this.selected = [data]
      } else {
        this.selected.push(data)
      }
    },
    removeOption(data) {
      if (this.isMultiselect) {
        let index = this.selected.indexOf(data)
        if (index !== -1) {
          this.selected.splice(index, 1)
        }
      } else {
        this.selected = []
      }
    },
    optionSelect(idx, e) {
      if (!this.optionsArray[idx].locked && !this.optionsArray[idx].disabled) {
        if (this.selected.includes(idx)) {
          if (this.removableSelection || this.isMultiselect) {
            this.removeOption(idx)
          }
        } else {
          if(!this.limits) this.addOption(idx)
          else if(this.limits > this.selected.length) this.addOption(idx)
        }
      }
      if (!this.isMultiselect) {
        this.hideSelect()
      }
      if (e) {
        e.stopPropagation()
      }
    },
    openSelect() {
      this.opened = true
    },
    hideSelect(e) {
      if (e) {
        e.stopPropagation()
      }
      this.opened = false
    },
    toggleSelect() {
      this.opened = !this.opened;
    },
    handleValueChange(val) {
      if (this.optionsArray.length < 1) return
      let value = _.cloneDeep(val)
      if (!Array.isArray(value)) {
        value = [value]
      }
      value = value.map(el => {
        if (typeof el === 'object' && el !== null && el.value) {
          return el.value
        }
        return el
      })
      let result = []
      value.forEach(el => {
        let idx = this.optionsArray.findIndex(item => item.value === el)
        if (idx !== -1 && !result.includes(idx)) {
          result.push(idx)
        }
      })
      this.setSelected(result)
    },
  },
  watch: {
    value: {
      handler: function (val) {
        this.handleValueChange(val)
      },
    },
    selected: {
      handler: function (val) {
        let value = []
        let selected = []
        if (this.optionsArray.length < 1) return
        val.forEach(el => {
          selected.push(this.optionsArray[el])
          value.push('value' in this.optionsArray[el] ? this.optionsArray[el].value : this.optionsArray[el])
        })
        if (!this.isMultiselect) {
          value = value[0]
          selected = selected[0]
        }
        if (this.queryParam) {
          this.$router.push({
            query: {
              ...this.queryParams,
              [this.queryParam]: JSON.stringify(value)
            }
          })
        }
        if (!_.isEqual(value, this.value)) {
          this.$emit('input', value)
          this.$emit('update:value', value)
          this.$emit('changed', selected)
        }
      },
      deep: true,
    },
    optionsArray: {
      handler: function () {
        if (this.queryParam && this.queryParams && this.queryParams[this.queryParam]) {
          this.handleValueChange(JSON.parse(this.queryParams[this.queryParam]))
        } else {
          this.handleValueChange(this.value)
        }
      },
      deep: true,
      immediate: true,
    },
    
  },
}
</script>

<style lang="scss">
.custom-select-component {
  position: relative;
  margin-bottom: 4px;
  color: #212529;
}

.custom-select-component__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1200;
}

.custom-select-component__block {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: $fieldHeight;
  padding: 1rem 3rem 1rem 1rem;
  border-radius: $fieldBorderRadius;
  border: 1px solid $secondary;
  background-color: transparent;
  color: $dark;
  
  &:after {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    display: block;
    margin-left: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    transform: translateY(-50%);
  }
}

.custom-select-component__preview-label {
  margin-right: 5px;
  font-weight: 500;
  white-space: nowrap;
}

.custom-select-component__preview-text-block {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.custom-select-component__preview-text {
  white-space: nowrap
}

.custom-select-component__block-options {
  position: absolute;
  top: calc(100% - 1px);
  min-width: 200px;
  width: 100%;
  border-radius: $fieldBorderRadius;
  visibility: hidden;
  overflow: hidden;
  border: 1px solid $secondary;
  //border-top: none;
  //background-color: $light;
  z-index: 1200;
}

.custom-select-component__options {
  max-height: 200px;
  overflow: auto;
}

.custom-select-component__option {
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(183, 204, 222, 0.5);
  }
  
  &.active {
    color: #0C2943;
    background: #B7CCDE;
  }
  
  &_locked {
    filter: grayscale(100%);
    cursor: not-allowed;
  }
}

.custom-select-component__search-area {
  border-bottom: 1px solid #B7CCDE;
}

.custom-select-component__search-input {
  display: block;
  width: 100%;
  border: none;
  outline: none;
  padding: 7px 12px;
}

.custom-select-component.active {
  .custom-select-component__block-options {
    visibility: visible;
  }
}

.custom-select-component {
  &_design_simple {
    .custom-select-component__block {
      padding-left: 0;
      color: rgb(12, 41, 67);
      border: none;
    }
    
    .custom-select-component__preview-label {
      font-weight: 600;
    }
    
    .custom-select-component__preview-text-block:after {
      display: none;
    }
  }
}
</style>
