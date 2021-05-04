<template>
404 Bulunamadı
</template>

<script>
export default {
  name: "404",
  data() {
    return {
      backgroundImageName : 'login_bg.png',
    }
  },
  created() {
    this.$store.commit('setBackgroundImage', this.backgroundImageName)
  }
}
</script>

<style scoped>

</style>