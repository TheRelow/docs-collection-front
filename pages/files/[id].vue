<template>
  <BasePageActions v-if="!editing">
    <BaseButton rounding="icon" type="secondary" @click="toggleEditing">
      <BaseIcon icon="pencil" color="inherit" />
    </BaseButton>
    <BaseButton rounding="icon" color="acc" type="secondary" @click="deleteDocPopup">
      <BaseIcon icon="delete" color="inherit" />
    </BaseButton>
  </BasePageActions>
  <BasePageActions v-else>
    <BaseButton rounding="icon" type="secondary" @click="saveEditing">
      <BaseIcon icon="check" color="inherit" />
    </BaseButton>
    <BaseButton rounding="icon" color="acc" type="secondary" @click="toggleEditing">
      <BaseIcon icon="close" color="inherit" />
    </BaseButton>
  </BasePageActions>
  <BasePopup v-model="deletePopup">
    You shure you want to delete "{{title}}"?
    <br>
    <br>
    <BaseButtonList>
      <BaseButton @click="deleteDoc" size="xs">
        Yes
      </BaseButton>
      <BaseButton @click="deleteDocPopup" size="xs" color="acc">
        No
      </BaseButton>
    </BaseButtonList>
  </BasePopup>
  <div v-if="file" class="file-container">
    <BaseTitle>
      <span contenteditable spellcheck="false" ref="titleElement" v-if="editing" style="outline: none">
        {{ title }}
      </span>
      <span v-else>
        {{ file.title }}
      </span>
    </BaseTitle>
    <div v-if="!editing" v-html="file.description" />
    <TipTap v-model="description" v-else></TipTap>
  </div>
</template>

<script lang="ts">
import {getDoc, updateDoc, deleteDoc} from "~/utils/api";
import TipTap from "~/components/TipTap.vue";

export default defineNuxtComponent({
  name: "file",
  components: {
    TipTap
  },
  data: ()=>({
    file: {},
    editing: false,
    title: '',
    description: '',
    deletePopup: false,
  }),
  methods: {
    deleteDocPopup() {
      this.deletePopup = !this.deletePopup
    },
    deleteDoc() {
      if (typeof this.$route.params.id === 'string') {
        this.deleteDocPopup()
        deleteDoc(this.$route.params.id)
          .then(() => {
            this.$router.push({ name: 'files'})
          })
      }
    },
    toggleEditing() {
      this.title = this.file.title
      this.description = this.file.description
      this.editing = !this.editing
    },
    saveEditing() {
      this.file.title = this.$refs.titleElement.innerText.trim()
      this.file.description = this.description
      this.editing = false
      this.updateDoc()
    },
    getDoc() {
      if (typeof this.$route.params.id === 'string') {
        getDoc(this.$route.params.id)
          .then(res => {
            this.file = res
            this.title = this.file.title
            this.description = this.file.description
          })
      }
    },
    updateDoc() {
      if (typeof this.$route.params.id === 'string') {
        updateDoc(this.$route.params.id, this.file)
          .then(res => {
            this.file = res
            this.title = this.file.title
            this.description = this.file.description
          })
      }
    },
  },
  created() {
    this.getDoc()
  },
})
</script>
