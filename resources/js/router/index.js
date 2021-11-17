import VueRouter from "vue-router";
import Vue from "vue";
import Index from "../pages/Index.vue";
Vue.use(VueRouter);
const routes = [
    {
        path: "",
        name: "index",
        component: Index,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
