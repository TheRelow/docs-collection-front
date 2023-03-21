<template>
  <BaseTitle>
    Components
  </BaseTitle>
 <BaseButton tag="nuxt-link" to="/components/buttons">Buttons</BaseButton>
  <br>
  <br>
 <BaseButton tag="nuxt-link" to="/components/grids">Grids</BaseButton>
  <br>
  <br>
 <BaseButton tag="nuxt-link" to="/components/cards">Cards</BaseButton>
  <br>
  <br>
 <BaseButton tag="nuxt-link" to="/components/popups">Popups</BaseButton>
  <br>
  <br>
 <BaseButton tag="nuxt-link" to="/components/selects">Selects</BaseButton>
  <br>
  <br>
 <BaseButton tag="nuxt-link" to="/components/alerts">Alerts</BaseButton>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "index"
})
</script>

<style scoped>

</style>
