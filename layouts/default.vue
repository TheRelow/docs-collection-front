<template>
  <DefaultHeader></DefaultHeader>
  <main :class="$style.main">
    <div class="container" :class="$style.main__container">
      <div :class="$style['page-actions']" id="page-actions"></div>
      <slot v-if="mounted" />
    </div>
  </main>
  <div id="popups" :class="classes" @click="popupsWrapperHandler"></div>
</template>

<script lang="ts">
import {useAppStore} from "~/store/app-state";
import DefaultHeader from "~/components/layout/DefaultHeader.vue";

import { defineComponent } from 'vue';

export default defineComponent({
  name: "default",
  data: ()=>({
    mounted: false,
  }),
  computed: {
    appStore() {
      return useAppStore()
    },
    openedPopups() {
      return this.appStore.popupsCount
    },
    closePopup() {
      return this.appStore.closePopup
    },
    classes(): string[] {
      let classList = []
    
      if (this.openedPopups > 0) {
        classList.push(this.$style['popup-area'])
      }
    
      return classList
    },
  },
  components: {DefaultHeader},
  methods: {
    popupsWrapperHandler(e: Event) {
      e.preventDefault()
      this.closePopup()
    },
  },
  mounted() {
    this.mounted = true
  }
})
</script>

<style module lang="scss">
.popup-area {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
}
.main {
  padding-top: $headerHeight;
}
.main__container {
  position: relative;
  padding-top: $headerBottomOffset;
  min-height: calc(100vh - $headerHeight);
}
.page-actions {
  position: absolute;
  top: $headerBottomOffset - 1rem;
  left: -5rem;
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 1rem;
  }
}
</style>
