<template>
  <div>
    <h4>Yeni Kullanıcı Oluştur</h4>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">E-Posta Adresi</label>
        <input v-model="form.email" type="email" class="form-control" id="email" placeholder="E-Posta">
        <span class="error" :class="{'d-none' : !form.errorMessage.email}">
        <ul>
          <li v-for="(item, index) in form.errorMessage.email" :key="index">
            {{ item }}
          </li>
        </ul>
      </span>
      </div>

      <div class="form-group">
        <label for="password">Şifre</label>
        <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Şifre">
        <span class="error" :class="{'d-none' : !form.errorMessage.password}">
        <ul>
          <li v-for="(item, index) in form.errorMessage.password" :key="index">
            {{ item }}
          </li>
        </ul>
      </span>
      </div>

      <div class="form-group">
        <label for="role">Rol</label>
        <select v-model="form.role" name="" id="role" class="form-control">
          <option value="" selected>- Seçiniz -</option>
          <option>admin</option>
          <option>editor</option>
        </select>
        <span class="error" :class="{'d-none' : !form.errorMessage.role}">
        <ul>
          <li v-for="(item, index) in form.errorMessage.role" :key="index">
            {{ item }}
          </li>
        </ul>
      </span>
      </div>


      <button type="submit" class="btn btn-primary">Oluştur</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addUser",
  data() {
    return {
      form: {
        email: null,
        password: null,
        role: '',
        errorMessage: {
          email: [],
          password: [],
          role: []
        }
      }
    }
  },
  methods : {
    onSubmit() {
      this.$swal({
        icon : 'question',
        text : 'Kullanıcı Oluşturuluyor Lütfen Bekleyiniz',
        allowOutsideClick : false
      });
      this.form.errorMessage.email = [];
      this.form.errorMessage.password = [];
      this.form.errorMessage.role = [];
      this.$swal.showLoading();

      axios.post("/register", { ...this.form }).then(response => {
        let responseData = response.data;
        if (responseData.status) {

          this.form.email = null;
          this.form.password = null;
          this.$swal.close();

          this.$router.push('/dashboard/datatable')

        }
      }).catch((error) => {
        let responseData = error.response.data;
        if (responseData.errors) {
          this.form.errorMessage.email = responseData.errors.email;
          this.form.errorMessage.password = responseData.errors.password;
          this.form.errorMessage.role = responseData.errors.role;
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

<style scoped>

</style>