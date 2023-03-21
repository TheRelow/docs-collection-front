<template>
  <BaseInput v-model="login" placeholder="login"></BaseInput>
  <BaseInput v-model="pass" placeholder="password"></BaseInput>
  <BaseButton>login</BaseButton>
</template>

<script>
export default {
  name: "login",
  data: ()=>({
    login: '',
    pass: '',
  }),
}
</script>
