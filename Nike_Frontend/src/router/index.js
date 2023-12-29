import { createWebHistory, createRouter } from "vue-router";
//import ContactBook from "@/views/ContactBook.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        
    },
    {
        path: "/product-manager",
        name: "product_manager",
        component: () => import("@/views/Product_manager.vue"),
        
    },
    {
        path: "/product-over-view",
        name: "product_over_view",
        component: () => import("@/views/Product_over_view.vue"),
        
    },
    {
        path: "/product-over-view-detail/:id",
        name: "product_over_view_detail",
        component: () => import("@/views/Product_over_view_detail.vue"),
        props: true 
    },
    {
        path: "/product-manager/:id",
        name: "product_manager.edit",
        component: () => import("@/views/Product_manager_edit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/product-manager",
        name: "product_manager.add",
        component: () => import("@/views/Product_manager_add.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/card",
        name: "card",
        component: () => import("@/views/Card.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/order",
        name: "order",
        component: () => import("@/views/Order.vue"),
        
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/logout",
        name: "logout",
        component: () => import("@/views/Logout.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
      
    {
        path: "/login-admin",
        name: "login-admin",
        component: () => import("@/views/Login_admin.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },




];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;