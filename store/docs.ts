import { defineStore } from "pinia";
import { getDocs } from "~/utils/api";

export const useDocsStore = defineStore({
  id: "doc-store",
  state: () => ({
    docs: [],
  }),
  actions: {
    getDocs() {
      getDocs().then((res) => {
        this.docs = res;
      });
    },
  },
  getters: {
    docsList: (state) => {
      return state.docs;
    },
  },
});
