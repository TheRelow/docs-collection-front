<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseRow",
  props: {
    // cols: {
    //   type: [Number, String],
    //   default: 12,
    // },
  },
}
</script>
