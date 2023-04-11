<template>
  <div :class="$style.card">
    <div :class="$style.card__title">
      <slot />
    </div>
    <div v-if="$slots.content" :class="$style.card__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {},
};
</script>

<style module lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: $cardGap;
  height: 100%;
  padding: $cardPaddingTopBottom $cardPaddingRightLeft;
  border-radius: $cardRadius;
  background-color: $cardBg;
  color: $dark;
}
.card__title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: $cardTitleGap;
  font-size: $cardFontSize;
  font-weight: $cardFontWeight;
}
.card__content {
}
</style>
