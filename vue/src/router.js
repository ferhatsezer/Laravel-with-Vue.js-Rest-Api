import {createWebHistory, createRouter} from "vue-router";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Page404 from "./pages/404"
import store from "./store/store";

import dashboardHome from "./components/Dashboard/Home"
import dashboardDatatable from "./components/Dashboard/Datatable"
import register from "./components/Dashboard/addUser"


const routes = [
    {path: "/", alias: '/Login', name: "Login", component: Login},
    {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard,
        children: [
            {path: "", component: dashboardHome},
            {path: "datatable", component: dashboardDatatable},
            {path: "register", component: register},
        ],
        beforeEnter(to, from, next)
        {
            if (store.getters.isAuthenticated) {
                next();
            } else {
                next("/login");
            }
        }
    },
    {path: "/:catchAll(.*)", name: "404", component: Page404},
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;