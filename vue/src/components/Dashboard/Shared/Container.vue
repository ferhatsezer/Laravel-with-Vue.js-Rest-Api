<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'Container',
  components:{}
}
</script>

<style lang="scss" scoped>
#main {
  margin: 0 30px;
  padding: 25px;
  border-radius: 10px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
</style>