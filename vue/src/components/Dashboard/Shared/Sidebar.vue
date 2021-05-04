<template>
  <div id="sidebar">
    <div class="border-container">
      <span class="border-style bgWhite"></span>
      <span class="border-style"></span>
    </div>
    <div class="content">
      <div class="logo">
        Logo
      </div>
      <ul class="nav flex-column text-center">

        <li class="nav-item">
          <router-link exact-active-class="active" to="/dashboard">Anasayfa</router-link>
        </li>

        <li class="nav-item">
          <router-link exact-active-class="active" to="/dashboard/datatable">Datatable</router-link>
        </li>
      </ul>

      <div class="bottom">
        <ul class="nav flex-column text-center">

          <li class="nav-item">
<!--            <router-link exact-active-class="active" to="/dashboard">Test User</router-link>-->
            <a href="javascript:;">Test User</a>
          </li>

          <li class="nav-item">
<!--            <router-link exact-active-class="active" to="/dashboard/datatable">Role</router-link>-->
            <a href="javascript:;">Role</a>
          </li>
          <li class="nav-item exit">
            <a @click.prevent="logout" href="#" >Çıkış</a>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Sidebar',
  components:{},
  methods:{
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/shared";
#sidebar {
  .border-container {
    position: fixed;
    height: 100%;
    width: 100px;
    top: 0;
    display: table;
    .border-style {
      border-right: 3px solid #dfdfdf;
      display: table-cell;
      height: 100%;
    }
    .bgWhite {
      background: $bgWhite;
    }
  }
  .content {
    margin-top: $dashboardMarginTop;
    background: $sideBarBackgroundColor;
    height: 100%;
    width: $sideBarWidth;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    border-right: 1px solid $borderColor;
  }
  .logo {
    text-align: center;
    margin: 45px 0;
    font-size: 35px;
    font-weight: bold;
    color: $logoColor;
    cursor: pointer;
  }
  ul {
    li {
      a {
        color: $menuColor;
        font-size: 20px;
      }
      .active {
        color:$logoColor;
      }
    }
  }
  .bottom {
    width: 100%;
    bottom: 150px;
    position: absolute;
    ul {
      li {
        background: $sideBarBottomMenuBackgroundColor;
        border-radius: 35px;
        margin: 2px 20px;
        text-align: left;
        padding: 0 10px;
        a {
          color: $logoColor;
          font-size: 18px;
          position: relative;
          bottom: 2px;
        }
        .active {
          color:$logoColor;
        }
      }
    }
    .exit {
      background: none;
      a {
        color: $sideBarBottomExitColor;
        font-size: 12px;
      }
    }
  }
}

</style>