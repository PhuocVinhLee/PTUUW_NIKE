<script>
import AppHeader from "@/components/AppHeader.vue";
import FooTer from "@/components/Footer.vue";
export default {
    components: {
        AppHeader,
        FooTer
    },
    data() {
        return {
            check_login1: 0,
            token: 0
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.

    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.

    },
    methods: {
        check_login() {
            this.token = localStorage.getItem("token");
            console.log(this.token)
            if (this.token == null || this.token == 0 || this.token == undefined) {
                return this.check_login1 = false;
            }
            else {
                return this.check_login1 = true;
            }

        },


    },
    mounted() {
        console.log(this.check_login());
    },
};
</script>
<template>
    <div id="app" class="container">
        <AppHeader />
        <div class=" mt-3">
            <router-view />
        </div>
      <FooTer />
        
    </div>
</template>
<style></style>
