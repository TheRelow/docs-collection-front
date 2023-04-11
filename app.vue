<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
  <Overlay></Overlay>
</template>

<script>
import "@mdi/font/scss/materialdesignicons.scss";
import Overlay from "~/components/Overlay.vue";
export default {
  name: "app.vue",
  components: {
    Overlay,
  },
};
</script>

<style scoped></style>
