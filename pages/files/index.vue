<template>
  <div>
    <BasePageActions>
      <BaseButton rounding="icon" type="secondary" tag="nuxt-link" to="/files/new-file">
        <BaseIcon icon="plus" color="inherit" />
      </BaseButton>
    </BasePageActions>
    <BaseTitle>
      Files
    </BaseTitle>
    <BaseRow>
      <BaseCol cols="3" v-for="(item, idx) in docs" :key="`file_${item._id}_${idx}`">
        <NuxtLink :to="`/files/${item._id}/`">
          <Card>
            <BaseIcon icon="file" />
            {{ item.title }}
          </Card>
        </NuxtLink>
      </BaseCol>
    </BaseRow>
  </div>
</template>

<script>
import { useDocsStore } from "@/store/docs";
export default {
  name: "index",
  computed: {
    docsStore() {
      return useDocsStore()
    },
    getDocs() {
      console.log('this.docsStore', this.docsStore)
      return this.docsStore.getDocs
    },
    docs() {
      return this.docsStore.docsList
    },
  },
  created() {
    console.log('this.getDocs', this.getDocs)
    this.getDocs()
  }
}
</script>
