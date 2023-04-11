<template>
  <Teleport to="#overlay-wrapper">
    <Transition name="fade">
      <div
        v-if="isOpened"
        class="popup"
        v-show="isOpened"
        @click="popupsClickHandler"
      >
        <div class="popup__content">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { useAppStore } from "~/store/app-state";

export default defineNuxtComponent({
  name: "BasePopup",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isOpened: false,
  }),
  computed: {
    popupId(): number {
      return this._.uid;
    },
    appStore() {
      return useAppStore();
    },
    popups() {
      return this.appStore.popups;
    },
    activePopup() {
      return this.appStore.activePopup;
    },
    isActive() {
      return this.activePopup === this.popupId;
    },
    popupOpened() {
      return () => this.appStore.popupOpened(this.popupId);
    },
    popupClosed() {
      return () => this.appStore.popupClosed(this.popupId);
    },
    closePopup() {
      return this.appStore.closePopup;
    },
  },
  methods: {
    popupsClickHandler(e: Event) {
      e.stopPropagation();
    },
  },
  beforeUnmount() {
    this.popupClosed();
  },
  watch: {
    popups: {
      handler: function (val) {
        if (this.modelValue) {
          if (!val.includes(this.popupId)) {
            this.$emit("update:modelValue", false);
          }
        }
      },
      deep: true,
    },
    modelValue: {
      handler: function (val) {
        this.isOpened = val;

        if (val) {
          this.popupOpened();
        } else {
          this.popupClosed();
        }
      },
      immediate: true,
    },
  },
});
</script>

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  overflow: hidden;
  filter: grayscale(100%);

  &:after {
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    background-color: rgba(0, 0, 0, 0.2);
    content: "";
  }

  &:last-child {
    pointer-events: all;
    filter: none;

    &:after {
      display: none;
    }
  }
}

.popup__content {
  min-width: 30vw;
  min-height: 20vh;
  padding: 2rem;
  background-color: $light;
  border-radius: 1rem;
  box-shadow: 4px 4px 8px 0 rgba(34, 60, 80, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transform-origin: center;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
