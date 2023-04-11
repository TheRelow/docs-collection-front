<template>
  <header :class="$style.header">
    <div :class="$style.header__container" class="container">
      <div :class="$style.header__row">
        <div :class="$style.header__left">
          <NuxtLink to="/" :class="$style.header__logo">
            Docs
            <br />
            Collection
          </NuxtLink>
          <div :class="$style.header__search">
            <Search></Search>
          </div>
        </div>
        <div :class="$style.header__menu">
          <NuxtLink
            :class="$style['header__menu-item']"
            to="/"
            :exact-active-class="$style.active"
          >
            Home
          </NuxtLink>
          <NuxtLink
            :class="$style['header__menu-item']"
            to="/components"
            :active-class="$style.active"
          >
            Components
          </NuxtLink>
          <NuxtLink
            :class="$style['header__menu-item']"
            to="/plugins"
            :active-class="$style.active"
          >
            Plugins
          </NuxtLink>
          <NuxtLink
            :class="$style['header__menu-item']"
            to="/files"
            :active-class="$style.active"
          >
            Files
          </NuxtLink>
        </div>
        <div :class="$style.header__right">
          <BaseButton tag="NuxtLink" to="/login">
            Login
            <BaseIcon icon="account-circle" color="inherit"></BaseIcon>
          </BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Search from "~/components/Search.vue";
export default {
  name: "DefaultHeader",
  components: {
    Search,
  },
};
</script>

<style module lang="scss">
@import "@/assets/scss/_grid.scss";
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $headerHeight;
  background-color: $light;
}
.header__container {
  height: 100%;
}
.header__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.header__left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include col(3, true);
}
.header__right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include col(3, true);
}
.header__menu {
  display: flex;
  justify-content: center;
  align-items: center;
  @include col(6, true);
}
.header__menu-item {
  font-size: 1rem;
  font-weight: 700;
  color: $secondary;
  text-decoration: none;
  &.active {
    color: $dark;
  }
}
.header__menu-item + .header__menu-item {
  margin-left: 2rem;
}
.header__logo {
  color: $dark;
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
}
.header__search {
  width: 30%;
}
</style>
