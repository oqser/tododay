import { createMemoryHistory, createRouter } from "vue-router";
import MainView from "../views/MainView.vue";

const routes = [
    {
        path: "/",
        component: MainView,
    },
    {
        path: "/total",
        component: () => import("../views/TotalView.vue"),
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
