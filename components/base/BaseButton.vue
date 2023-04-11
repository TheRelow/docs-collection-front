<script lang="ts">
import { defineComponent, h } from "vue";
import { NuxtLink } from "#components";
import { DefineComponent } from "nuxt/dist/app/compat/capi";

export default defineComponent({
  name: "BaseButton",
  props: {
    size: {
      type: String,
      default: "m",
      validator: (value: string) =>
        ["xs", "s", "m", "l", "xxl"].includes(value),
    },
    type: {
      type: String,
      default: "primary",
      validator: (value: string) =>
        ["primary", "secondary", "tertiary"].includes(value),
    },
    rounding: {
      type: [Boolean, String],
      default: false,
    },
    tag: {
      type: String,
      default: "button",
      validator: (value: string) =>
        [
          "button",
          "nuxt-link",
          "NuxtLink",
          "a",
          "router-link",
          "RouterLink",
        ].includes(value),
    },
    color: {
      type: String,
      default: "default",
      validator: (value: string) => ["default", "acc"].includes(value),
    },
  },
  computed: {
    classes(): string[] {
      let classList = [this.$style.button];

      if (this.color !== "default") {
        classList.push(this.$style[`button_color_${this.color}`]);
      }
      if (this.size !== "m") {
        classList.push(this.$style[`button_size_${this.size}`]);
      }
      if (this.type !== "primary") {
        classList.push(this.$style[`button_type_${this.type}`]);
      }
      if (this.rounding !== false) {
        classList.push(this.$style[`button_rounding`]);
        if (typeof this.rounding === "string") {
          classList.push(this.$style[`button_rounding_${this.rounding}`]);
        }
      }
      if (this.$attrs.class) {
        classList.push(this.$attrs.class);
      }

      return classList;
    },
  },
  methods: {
    genTag(): string | DefineComponent {
      if (this.tag === "nuxt-link" || this.tag === "NuxtLink") return NuxtLink;
      return this.tag;
    },
    genData() {
      return {
        ["data-base-button"]: true,
        class: this.classes,
      };
    },
    genContent(tag: string | DefineComponent): Function | VNode {
      let result = h(
        "span",
        {
          class: this.$style.button__content,
        },
        this.$slots
      );
      if (typeof tag !== "string") {
        return () => result;
      }
      return result;
    },
  },
  render(): VNode {
    let tag = this.genTag();
    let data = this.genData();
    let content = this.genContent(tag);
    //TODO: понять почему если передаётся просто название тега - нужно как children передавать функцию, а если передаётся компонент - передавать просто слот
    return h(tag, data, content);
  },
});
</script>

<style module lang="scss">
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: $buttonHeight;
  padding: 1em 1.75em;
  background-color: $primary;
  font-size: 1rem;
  line-height: 1.2;
  border-radius: 0.5em;
  border: 1px solid $primary;
  color: $light;
  cursor: pointer;
  transition: background-color 0.2s, border 0.2s;
  text-decoration: none;

  &:hover {
    background-color: $primary-700;
    border-color: $primary-700;
  }

  &:active {
    background-color: $primary-900;
    border-color: $primary-900;
  }
}

.button__content {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: $buttonContentGap;
}

.button_size_s {
  min-height: $buttonHeightS;
  padding: 0.75em 1.375em;
}

.button_size_xs {
  min-height: $buttonHeightXs;
  padding: 0.75em 1.375em;
  font-size: 0.875rem;
}

.button_type_secondary {
  background-color: transparent;
  border: 1px solid $primary;
  color: $primary;

  &:hover {
    color: $light;
  }

  &:active {
    background-color: $primary-900;
    border: 1px solid $primary-900;
  }
}

.button_type_tertiary {
  background-color: transparent;
  border-color: transparent;
  color: $primary;

  &:hover {
    background-color: $primary-50;
    border-color: $primary-50;
  }

  &:active {
    background-color: $primary-100;
    border-color: $primary-100;
    color: $primary-900;
  }
}

.button_rounding {
  border-radius: 500px;
}

.button_rounding_icon {
  width: $buttonHeight;
  height: $buttonHeight;
  padding: 0;

  &.button_size_s {
    width: $buttonHeightS;
    height: $buttonHeightS;
  }

  &.button_size_s {
    width: $buttonHeightXs;
    height: $buttonHeightXs;
  }
}

.button_color_acc {
  background-color: $acc;
  border-color: $acc;
  &:hover {
    background-color: $acc-700;
    border-color: $acc-700;
  }
  &:active {
    background-color: $acc-900;
    border-color: $acc-900;
  }
  &.button_type_secondary {
    color: $acc;
    background-color: transparent;
    &:hover {
      background-color: $acc;
      color: $light;
    }
  }
}
</style>
