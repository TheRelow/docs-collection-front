<template>
  <BaseTitle>Containment</BaseTitle>
  <CardsList :cards="componentsList"></CardsList>
</template>

<script>
import { defineComponent } from "vue";
import CardsList from "~/components/CardsList.vue";

export default defineComponent({
  name: "Containment",
  components: {
    CardsList,
  },
  data: () => ({
    componentsList: [
      {
        title: "Buttons",
        to: "/components/containment/buttons",
      },
      {
        title: "Cards",
        to: "/components/containment/cards",
      },
      {
        title: "Popups",
        to: "/components/containment/popups",
      },
      {
        title: "Alerts",
        to: "/components/containment/alerts",
      },
    ],
  }),
});
</script>
