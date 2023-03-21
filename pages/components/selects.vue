<template>
  <BaseSelect :options="options">
  
  </BaseSelect>
</template>

<script>

export default {
  name: "selects",
  data: ()=>({
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  }),
}
</script>
