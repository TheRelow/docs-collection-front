<template>
  <BaseTitle> Components</BaseTitle>
  <CardsList :cards="componentsList"></CardsList>
</template>

<script>
import { defineComponent } from "vue";
import CardsList from "~/components/CardsList.vue";

export default defineComponent({
  name: "index",
  components: {
    CardsList,
  },
  data: () => ({
    componentsList: [
      {
        title: "Containment",
        to: "/components/containment",
      },
      {
        title: "Form elements",
        to: "/components/form-elements",
      },
      {
        title: "Grids",
        to: "/components/grids",
      },
    ],
  }),
});
</script>

<style scoped></style>
