import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "./style.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "primeicons/primeicons.css";

createApp(App)
    .use(router)
    .use(VueQueryPlugin)
    .use(Vue3Toastify, {
        autoClose: 2000,
    })
    .mount("#app");
