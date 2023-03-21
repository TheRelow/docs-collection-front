import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app-store",
  state: () => ({
    popups: [],
  }),
  actions: {
    popupOpened(id: number) {
      let idx = this.popups.findIndex((el) => el === id);
      if (idx === -1) {
        // @ts-ignore
        this.popups.push(id);
      }
    },
    popupClosed(id: number) {
      let idx = this.popups.findIndex((el) => el === id);
      if (idx !== -1) {
        this.popups.splice(idx, 1);
      }
    },
    closePopup(id: number | undefined) {
      if (this.popups.length < 1) return;
      let idx;
      if (!id) {
        idx = this.popups.length - 1;
      } else {
        idx = this.popups.findIndex((el) => el === id);
      }
      if (idx !== -1) {
        // @ts-ignore
        this.popups.splice(idx, 1);
      }
    },
  },
  getters: {
    popupsCount: (state): number => {
      return state.popups.length;
    },
    activePopup: (state) => {
      if (state.popups.length - 1 === 0) {
        return undefined;
      }
      return state.popups[state.popups.length - 1];
    },
  },
});
