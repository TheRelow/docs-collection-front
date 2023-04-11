<template>
  <BaseTitle>
    Buttons
  </BaseTitle>
  <BaseButtonList>
    <BaseButton>test</BaseButton>
    <BaseButton size="s">qweqwe</BaseButton>
    <BaseButton size="xs">qweqwe</BaseButton>
  </BaseButtonList>
  <br>
  <BaseButtonList>
    <BaseButton type="secondary">qweqwe</BaseButton>
    <BaseButton type="secondary" size="s">qweqwe</BaseButton>
    <BaseButton type="secondary" size="xs">qweqwe</BaseButton>
  </BaseButtonList>
  <br>
  <BaseButtonList>
    <BaseButton type="tertiary">qweqwe</BaseButton>
    <BaseButton type="tertiary" size="s">qweqwe</BaseButton>
    <BaseButton type="tertiary" size="xs">qweqwe</BaseButton>
  </BaseButtonList>
  <br>
  <BaseButtonList>
    <BaseButton>
      Login
      <BaseIcon icon="account-circle" color="light"></BaseIcon>
    </BaseButton>
    <BaseButton>
      button
    </BaseButton>
    <BaseButton rounding>
      <BaseIcon icon="account-circle" color="light"></BaseIcon>
      Rounded
    </BaseButton>
    <BaseButton rounding="icon">
      <BaseIcon icon="account-circle" color="light"></BaseIcon>
    </BaseButton>
    <BaseButton rounding="icon" type="secondary">
      <BaseIcon icon="account-circle" color="inherit"></BaseIcon>
    </BaseButton>
    <BaseButton rounding="icon" type="tertiary">
      <BaseIcon icon="account-check" color="inherit"></BaseIcon>
    </BaseButton>
    <BaseButton type="secondary" size="xs" rounding>
      <BaseIcon icon="folder-key" color="inherit"></BaseIcon>
      Folder
    </BaseButton>
  </BaseButtonList>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "buttons"
})
</script>

<style scoped>

</style>
