<template>
  <div>
    <button type="button" class="btn btn-primary add-user" @click="addUser">Yeni Kullanıcı Oluştur</button>

    <table id="datatable" class="display" style="width:100%">
      <thead>
      <tr>
        <th v-for="(item, index) in tableFields" :key="index">{{ item }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in tableItems" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.role }}</td>
        <td>{{ new Date(item.created_at).toLocaleString() }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import 'datatables.net-dt/js/dataTables.dataTables.min';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import axios from "axios";

export default {
  name: "Datatable",
  data() {
    return {
      table : '#datatable',
      tableFields : [ 'id', 'email', 'role', 'created date' ],
      tableItems : []
    }
  },
  created() {
    this.$swal.showLoading();
    axios.get('/all-users',  {
      headers : {
        'Authorization' : 'Bearer ' + this.$store.getters.getToken
      }
    }).then(response => {
      this.tableItems = response.data.users;
      setTimeout(() => {
        $(this.table).dataTable();
      }, 10)
    }).catch(() => {
      this.$store.dispatch('logout');
    }).finally(() => {
      this.$swal.close();
    })
  },
  methods : {
    addUser() {
      this.$router.push('/dashboard/register');
    }
  }
}
</script>

<style scoped lang="scss">

#datatable {
  overflow: auto;
}

.add-user {
  margin-bottom: 20px;
}
</style>