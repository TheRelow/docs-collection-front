<template>
  <div :class="$style['button-list']">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "BaseButtonList",
});
</script>

<style module lang="scss">
.button-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  * + * {
    margin-left: 20px;
  }
}
</style>
