<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <div class="copyright float-left" id="copyright">
        ©
        <span>{{ currYear }}</span>
        Diab.Predict Technologies
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      currYear: "",
      year: new Date().getFullYear()
    };
  },
  mounted() {
    this.currYear = new Date().getFullYear();
  }
};
</script>
<style></style>
