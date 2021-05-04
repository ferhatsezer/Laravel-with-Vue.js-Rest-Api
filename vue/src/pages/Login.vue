<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-4 col-lg-3 col-md-3"></div>
      <div class="col-xl-4 col-lg-6 col-md-6 login-box">
        <Form />
      </div>
      <div class="col-xl-4 col-lg-3 col-md-3"></div>
    </div>
  </div>
</template>

<script>
import Form from '../components/Login/Form'
export default {
  name: "Login",
  components : {
    Form
  },
  data() {
    return {
      backgroundImageName : 'login_bg.jpg',
    }
  },
  created() {
    this.$store.commit('setBackgroundImage', this.backgroundImageName)
  }
}
</script>

<style lang="scss" scoped>

//body {
//  background: url($LoginBackgroundImage) no-repeat center center fixed;
//  -webkit-background-size: cover;
//  -moz-background-size: cover;
//  -o-background-size: cover;
//  background-size: cover;
//}

.login-box {
  margin-top: 100px;
  padding: 35px;
  border-radius: 30px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
</style>