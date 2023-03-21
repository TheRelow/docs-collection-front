<template>
  <span :class="classes"></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "BaseIcon",
  props: {
    icon: {
      type: String,
      required: true,
      default: 'magnify'
    },
    color: {
      type: String,
      default: 'dark'
    },
  },
  computed: {
    classes(): string[] {
      let classList = [this.$style.icon, 'mdi']

      if (this.color !== 'dark') {
        classList.push(this.$style[`icon_color_${this.color}`])
      }
      if (this.icon) {
        classList.push(`mdi-${this.icon}`)
      }

      return classList
    },
  },
})
</script>

<style module lang="scss">
.icon {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  color: $dark;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.icon_color_light {
  color: $light;
}

.icon_color_inherit {
  color: currentColor;
}
</style>
