<template>
  <div :class="classes">
    <BaseInput rounding="circle" :class="$style['search-input']" v-model:focus="focus"></BaseInput>
    <BaseButton rounding="icon" :class="$style['search-btn']" @click="searchClick">
      <BaseIcon icon="magnify" color="inherit"></BaseIcon>
    </BaseButton>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  name: "Search",
  data: ()=>({
    opened: false,
    focus: false,
  }),
  computed: {
    classes(): string[] {
      let classList = [this.$style.search]
      
      if (this.$attrs.class) {
        classList.push(this.$attrs.class)
      }
      if (this.opened) {
        classList.push(this.$style.opened)
      }
      
      return classList
    },
  },
  methods: {
    searchClick() {
      this.focus = !this.opened
      this.opened = !this.opened
    },
  },
  watch: {
    focus: {
      handler: function (val) {
        if (!val) {
          this.opened = false
        }
      }
    },
  },
})
</script>

<style module lang="scss">
.search {
  position: relative;
  width: $buttonHeight;
  transition: 0.2s;
  background-color: $light;
  &.opened {
    width: calc($containerWidth * 0.6);
  }
}
.search-input {
  width: 100%;
}
.search-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
