<template>
  <div
    id="overlay-wrapper"
    :class="classes"
    @click="popupsWrapperHandler"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "~/store/app-state";

export default defineComponent({
  name: "Overlay",
  computed: {
    appStore() {
      return useAppStore();
    },
    openedPopups() {
      return this.appStore.popupsCount;
    },
    closePopup() {
      return this.appStore.closePopup;
    },
    classes(): string[] {
      let classList = [];

      if (this.openedPopups > 0) {
        classList.push(this.$style["overlay-wrapper"]);
      }

      return classList;
    },
  },
  methods: {
    popupsWrapperHandler(e: Event) {
      e.preventDefault();
      this.closePopup();
    },
  },
});
</script>

<style module lang="scss">
.overlay-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
