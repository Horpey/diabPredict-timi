<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <fade-transition>
        <router-view />
      </fade-transition>
    </div>
    <router-view name="footer" />
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
export default {
  components: {
    "fade-transition": FadeTransition
  }
};
</script>
