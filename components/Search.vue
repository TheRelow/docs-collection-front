<template>
  <div :class="classes">
    <BaseInput
      rounding="circle"
      :class="$style['search-input']"
      v-model:focus="focus"
    ></BaseInput>
    <BaseButton
      rounding="icon"
      :class="$style['search-btn']"
      @click="searchClick"
    >
      <BaseIcon icon="magnify" color="inherit"></BaseIcon>
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

let animateTimeout: ReturnType<typeof setTimeout>;

export default defineComponent({
  name: "Search",
  data: () => ({
    opened: false,
    focus: false,
    animate: false,
  }),
  computed: {
    classes(): string[] {
      let classList = [this.$style.search];

      if (this.$attrs.class) {
        classList.push(this.$attrs.class);
      }
      if (this.opened) {
        classList.push(this.$style.opened);
      }
      if (this.animate) {
        classList.push(this.$style.animate);
      }

      return classList;
    },
  },
  methods: {
    searchClick() {
      this.focus = !this.opened;
      this.opened = !this.opened;
    },
  },
  watch: {
    focus: {
      handler: function (val) {
        if (!val) {
          this.opened = false;
        }
      },
    },
    opened: {
      handler: function (val) {
        if (val) {
          clearTimeout(animateTimeout);
          this.animate = true;
        } else {
          animateTimeout = setTimeout(() => {
            this.animate = false;
          }, 200);
        }
      },
    },
  },
});
</script>

<style module lang="scss">
.search {
  position: relative;
  width: $buttonHeight;
  background-color: $light;
  &.animate {
    transition: 0.2s;
  }
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
