<template>
  <div :class="$style.title">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BaseTitle"
}
</script>

<style module lang="scss">
.title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: $secondary;
}
</style>
