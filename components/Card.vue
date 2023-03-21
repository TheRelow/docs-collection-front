<template>
  <div :class="$style.card">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
  
  },
}
</script>

<style module lang="scss">
.card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: $cardGap;
  height: 100%;
  padding: $cardPaddingTopBottom $cardPaddingRightLeft;
  border-radius: $cardRadius;
  background-color: $cardBg;
  font-size: $cardFontSize;
  font-weight: $cardFontWeight;
  color: $dark;
}
</style>
