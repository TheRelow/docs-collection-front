<template>
  <BaseRow>
    <BaseCol :cols="item.cols || 3" v-for="item of cards">
      <NuxtLink :to="item.to">
        <Card>
          {{ item.title }}
          <template #content v-if="item.content">{{ item.content }}</template>
        </Card>
      </NuxtLink>
    </BaseCol>
  </BaseRow>
</template>

<script>
import Card from "~/components/Card.vue";

export default {
  name: "CardsList",
  components: {
    Card,
  },
  props: {
    cards: Array,
  },
};
</script>

<style scoped></style>
