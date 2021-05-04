import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import axios from 'axios';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Main = createApp(App);
Main.use(router);
Main.use(store);
Main.use(VueSweetalert2, {
    confirmButtonText : 'Tamam',
});
Main.mount('#app');
// createApp(App).use(router).mount('#app')