<template>
  <div id="main">
    <Sidebar />
    <div id="content">
      <Container />
      <Footer />
    </div>
  </div>
</template>

<script>

import Sidebar from '../components/Dashboard/Shared/Sidebar';
import Container from '../components/Dashboard/Shared/Container';
import Footer from '../components/Dashboard/Shared/Footer';
export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Container,
    Footer
  },
  data() {
    return {
      backgroundImageName : 'dashboard_bg.png',
    }
  },
  created() {
    this.$store.commit('setBackgroundImage', this.backgroundImageName)
  }
}
</script>

<style lang="scss" scoped>
#main {
  margin-top: $dashboardMarginTop;
  #content {
    margin-left: $sideBarWidth;
  }
}
</style>