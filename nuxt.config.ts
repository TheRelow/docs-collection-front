// nuxt.config
export default {
  modules: ["@pinia/nuxt"],
  css: ["@/assets/scss/normalize.scss", "@/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: true,
          additionalData: `@import "@/assets/scss/_variables.scss"; @import "@/assets/scss/variables.scss"; `,
        },
      },
    },
  },
};
