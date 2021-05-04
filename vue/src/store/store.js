import { createStore } from 'vuex';
import axios from "axios";
import router from "../router";

export default createStore({
    state: {
        backgroundImage: 'login_bg.jpg',
        token : null,
        tokenExpiresIn : null,
        is_login : false
    },
    mutations: {
        setBackgroundImage(state, val) {
            state.backgroundImage = val;
        },
        setToken(state, token) {
            state.token = token;
        },
        setTokenExpiresIn(state, expiresAt) {
            state.tokenExpiresIn = expiresAt;
        },
        clearToken(state) {
            state.token = null;
            state.tokenExpiresIn = null;
        },
    },
    actions: {
        init({ commit, dispatch }) {
            let token = localStorage.getItem("token");
            if (token) {

                let expirationDate = localStorage.getItem('tokenExpiresIn');
                let now = new Date().getTime() / 1000;
                if (now >= +expirationDate) {
                    dispatch("logout");
                } else {
                    dispatch("setTimeoutTimer", +expirationDate);
                }

                commit("setToken", token);
                router.push("/dashboard");
            } else {
                router.push("/login");
                return false;
            }
        },
        login({ commit, dispatch }, authData) {
            return axios.post("/login", { ...authData }).then(response => {
                let responseData = response.data;
                if (responseData.status) {
                    commit('setToken', responseData.token);
                    commit('setTokenExpiresIn', responseData.expires_in);
                    localStorage.setItem("token", responseData.token);
                    localStorage.setItem("tokenExpiresIn", responseData.expires_in);
                    dispatch("setTimeoutTimer", +responseData.expires_in);
                }
            });
        },
        logout({ commit, getters }) {

            axios.post("/logout", false, {
                headers : {
                    'Authorization' : 'Bearer ' + getters.getToken
                }
            }).then(response => {
                console.log(response);
            });

            commit('clearToken');
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiresIn");
            router.replace("/login");
        },
        setTimeoutTimer({ dispatch }, tokenExpiresIn)
        {
            // console.log(tokenExpiresIn - new Date().getTime() / 1000);

            setTimeout(() => {
                dispatch("logout");
            },(tokenExpiresIn - new Date().getTime() / 1000) * 1000)
        }
    },
    getters: {
        getBackgroundImage(state) {
            return state.backgroundImage;
        },
        getToken(state) {
            return state.token;
        },
        isAuthenticated(state) {
            return state.token !== null;
        }
    },
    modules: {}
})