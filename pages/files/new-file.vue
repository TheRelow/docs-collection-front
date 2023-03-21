<template>
  <BaseTitle>
    New file
  </BaseTitle>
  <BaseInput placeholder="Title" v-model="title"></BaseInput>
  <br><br>
  <BaseButton rounding size="xs" @click="createDoc">
    create
  </BaseButton>
</template>

<script>
import {createDoc} from "~/utils/api";
export default {
  name: "new-file",
  data: ()=>({
    title: ''
  }),
  methods: {
    createDoc() {
      createDoc({
        title: this.title
      })
        .then(res => {
          console.log('res', res)
          this.$router.push({ name: 'files-id', params: { id: res._id } })
        })
    },
  },
}
</script>

<style scoped>

</style>
