<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <input v-model="form.email" type="text" class="form-control" placeholder="E-Posta">
      <span class="error" :class="{'d-none' : !form.errorMessage.email}">
        <ul>
          <li v-for="(item, index) in form.errorMessage.email" :key="index">
            {{ item }}
          </li>
        </ul>
      </span>
    </div>
    <div class="form-group">
      <input v-model="form.password" type="password" class="form-control" placeholder="Şifre">
      <span class="error">
        <ul>
          <li v-for="(item, index) in form.errorMessage.password" :key="index">
            {{ item }}
          </li>
        </ul>
      </span>
    </div>

    <div class="form-group text-center mt-4">
      <a href="javascript:;" class="forget-password">Şifremi Hatırlamıyorum</a>
    </div>

    <div class="form-group text-center">
      <button><i class="fas fa-arrow-right"></i> GİRİŞ</button>
    </div>

  </form>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      form : {
        email : null,
        password : null,
        errorMessage : {
          email : [],
          password : []
        }
      }
    }
  },
  methods : {
    onSubmit() {
      this.$swal({
        icon : 'question',
        text : 'Oturum Açılıyor Lütfen Bekleyiniz',
        allowOutsideClick : false
      });
      this.form.errorMessage.email = [];
      this.form.errorMessage.password = [];
      this.$swal.showLoading();
      this.$store.dispatch("login", { ...this.form }).then(() => {
        this.form.email = null;
        this.form.password = null;
        this.$swal.close();
        this.$router.push('/dashboard');
      }).catch((error) => {
        let responseData = error.response.data;
        if (responseData.errors) {
          this.form.errorMessage.email = responseData.errors.email;
          this.form.errorMessage.password = responseData.errors.password;
          this.$swal.close();
        } else {
          this.$swal({
            icon : 'error',
            text : responseData.message
          });
        }

      });
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  margin: 0 auto;
  padding: 15px;

  input {
    color: $mainColor;
    outline: 0;
    border-width: 0 0 1px;
    border-color: $borderColor;
    background: none;

    &:focus {
      background: none;
      box-shadow: none;
    }
  }
  .forget-password {
    color: $mainColor;

    &:hover {
      text-decoration: none;
    }
  }
  button {
    background: none;
    border: 1px solid $mainColor;
    color: $mainColor;
    border-radius: 15px;
    padding: 5px 10px;
  }

}
</style>