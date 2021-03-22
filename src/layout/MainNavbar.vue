<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template slot-scope="{ toggle, isToggled }">
      <router-link class="navbar-brand" to="/">
       Diab.Predict
      </router-link>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/"
        >
          <p>Home</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/ontology"
        >
          <p>Ontology</p>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/about"
        >
          <p>About</p>
        </router-link>
      </li>

    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/landing.scss";
</style>
