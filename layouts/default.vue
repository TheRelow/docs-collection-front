<template>
  <DefaultHeader></DefaultHeader>
  <main :class="$style.main">
    <div class="container" :class="$style.main__container">
      <div :class="$style['page-actions']" id="page-actions"></div>
      <slot v-if="mounted" />
    </div>
  </main>
</template>

<script lang="ts">
import { useAppStore } from "~/store/app-state";
import DefaultHeader from "~/components/layout/DefaultHeader.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "default",
  components: { DefaultHeader },
  data: () => ({
    mounted: false,
  }),
  mounted() {
    this.mounted = true;
  },
});
</script>

<style module lang="scss">
.main {
  padding-top: $headerHeight;
}
.main__container {
  position: relative;
  padding-top: $headerBottomOffset;
  min-height: calc(100vh - $headerHeight);
}
.page-actions {
  position: absolute;
  top: $headerBottomOffset - 1rem;
  left: -5rem;
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 1rem;
  }
}
</style>
