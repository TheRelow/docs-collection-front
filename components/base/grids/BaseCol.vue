<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BaseCol",
  props: {
    cols: {
      type: [Number, String],
      default: 12,
    },
  },
  computed: {
    classes() {
      let classList = ["col"];
      if (+this.cols !== 12) {
        classList.push(`col-${this.cols}`);
      }
      return classList;
    },
  },
};
</script>
