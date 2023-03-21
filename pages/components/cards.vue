<template>
  <BaseTitle>
    Cards
  </BaseTitle>
  <BaseRow>
    <BaseCol cols="3">
      <NuxtLink to="/">
        <Card>
          <BaseIcon icon="file" />
          some file
        </Card>
      </NuxtLink>
    </BaseCol>
    <BaseCol cols="3">
      <NuxtLink to="/">
        <Card>qwe</Card>
      </NuxtLink>
    </BaseCol>
    <BaseCol cols="3">
      <Card>qwe</Card>
    </BaseCol>
    <BaseCol cols="3">
      <Card>qwe</Card>
    </BaseCol>
    <BaseCol cols="4">
      <Card>qwe</Card>
    </BaseCol>
    <BaseCol cols="4">
      <Card>qwe</Card>
    </BaseCol>
    <BaseCol cols="4">
      <Card>qwe</Card>
    </BaseCol>
    <BaseCol cols="6">
      <Card>qwe</Card>
    </BaseCol>
    <BaseCol cols="6">
      <Card>qwe</Card>
    </BaseCol>
  </BaseRow>
</template>

<script>
import Card from "~/components/Card.vue";
export default {
  name: "cards",
  components: {
    Card
  }
}
</script>
