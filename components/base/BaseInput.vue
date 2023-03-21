<template>
  <input type="text" v-model="inputValue" :class="classes" ref="input">
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  name: "BaseInput",
  data: ()=>({
    isFocus: false,
    inputValue: '',
  }),
  emits: ['update:focus', 'update:value'],
  props: {
    value: {
      type: String
    },
    focus: {
      type: Boolean,
      default: false,
    },
    rounding: String,
  },
  computed: {
    classes(): string[] {
      let classList = [this.$style.input]
      
      if (this.$attrs.class) {
        classList.push(this.$attrs.class)
      }
      if (this.rounding) {
        classList.push(this.$style[`input_rounding_${this.rounding}`])
      }
      
      return classList
    },
  },
  mounted() {
    this.$refs.input.onblur = () => {
      this.$emit('update:focus', false)
    }
    this.$refs.input.onfocus = () => {
      this.$emit('update:focus', true)
    }
  },
  watch: {
    focus: {
      handler: function (val) {
        if (val) {
          this.$refs.input.focus()
        }
      }
    },
    value: {
      handler: function (val) {
        this.inputValue = val
      },
      immediate: true,
    },
    inputValue: {
      handler: function (val) {
        this.$emit('update:value', val)
      },
      immediate: true,
    },
  },
})
</script>

<style module lang="scss">
.input {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: $fieldHeight;
  margin-bottom: 0.5rem;
  padding: 1rem;
  border-radius: $fieldBorderRadius;
  background-color: transparent;
  border: 1px solid $secondary;
}
.input_rounding_circle {
  border-radius: 500px;
}
</style>
