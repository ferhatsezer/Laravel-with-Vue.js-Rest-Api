<template>
  <div id="backgroundImage" :style="{ backgroundImage: 'url(' + require('./assets/img/' + this.$store.getters.getBackgroundImage ) + ')' }">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name : "App",
  components : {},
  created() {
    this.$store.dispatch("init");
  }
}
</script>

<style lang="scss">

#backgroundImage {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: -1;
  overflow: auto;
}

</style>