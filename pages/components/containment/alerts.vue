<template>
  <BaseTitle>
    Alerts
  </BaseTitle>
  <BaseButton @click="showToast">
    Alert
  </BaseButton>
</template>

<script>
export default {
  name: "alerts",
  methods: {
    showToast() {
      this.$toast.success("Hello!");
    }
  }
}
</script>
