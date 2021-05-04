<template>
  <div id="footer">
    <span class="copyright">
      Copyright © 2020
    </span>
  </div>
</template>

<script>
export default {
  name:'Footer',
  components:{}
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/shared";
#footer {
  position: fixed;
  bottom: 0;
  background: $footerBackgroundColor;
  width: 100%;
  overflow-x : hidden;
  padding: 15px;
  border-top: 1px solid $borderColor;

  .copyright {
    font-weight: bold;
    font-size: 14px;
  }

  a {
    color: $linkColor;
  }
}
</style>