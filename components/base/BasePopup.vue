<template>
  <Teleport to="#popups" v-if="isOpened">
    <div class="popup" @click="popupsClickHandler">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script lang="ts">
import {useAppStore} from "~/store/app-state";

export default defineNuxtComponent({
  name: "BasePopup",
  emits: [
    'update:modelValue'
  ],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data: ()=>({
    isOpened: false,
  }),
  computed: {
    popupId(): number {
      return this._.uid
    },
    appStore() {
      return useAppStore()
    },
    popups() {
      return this.appStore.popups
    },
    activePopup() {
      return this.appStore.activePopup
    },
    isActive() {
      return this.activePopup === this.popupId
    },
    popupOpened() {
      return () => this.appStore.popupOpened(this.popupId)
    },
    popupClosed() {
      return () => this.appStore.popupClosed(this.popupId)
    },
    closePopup() {
      return this.appStore.closePopup
    },
  },
  methods: {
    popupsClickHandler(e: Event) {
      e.stopPropagation()
    },
  },
  beforeUnmount() {
    this.popupClosed()
  },
  watch: {
    popups: {
      handler: function (val) {
        if (this.modelValue) {
          console.log('val', val)
          console.log('this.popupId', this.popupId)
          if (!val.includes(this.popupId)) {
            console.log('delete')
            this.$emit('update:modelValue', false)
          }
        }
      },
      deep: true
    },
    modelValue: {
      handler: function (val) {
        this.isOpened = val
  
        if (val) {
          this.popupOpened()
        } else {
          this.popupClosed()
        }
      },
      immediate: true,
    },
  },
})
</script>

<style lang="scss">
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 30vw;
  min-height: 20vh;
  padding: 2rem;
  background-color: $light;
  border-radius: 1rem;
  transform: translate(-50%, -50%);
  pointer-events: none;
  //user-select: none;
  overflow: hidden;
  filter: grayscale(100%);
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
  &:after {
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    background-color: rgba(0,0,0,0.2);
    content: '';
  }
  &:last-child {
    pointer-events: all;
    filter: none;
    &:after {
      display: none;
    }
  }
}
</style>
