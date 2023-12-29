<template>
    <nav class="navbar navbar-expand-lg bg-light mt-3">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Nike</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'Home' }" class="nav-link">
                            <i class="fa-solid fa-house"></i>

                            Trang chủ
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="check_admin()">
                        <router-link :to="{ name: 'product_manager' }" class="nav-link">
    
                            <i class="fa-solid fa-wand-magic-sparkles"></i>
                            Quản lý sản phẩm
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="!check_admin() ">
                        <router-link :to="{ name: 'product_over_view' }" class="nav-link">
                            <i class="fa-solid fa-list"></i>
                            Sản phẩm
                           
                        </router-link>
                    </li>
                    <li v-if="!this.check_login1" class="nav-item">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            <i class="fa fa-sign-in" aria-hidden="true"></i>
                            Đăng nhập

                          
                        </router-link>

                    </li>
                    <li v-else class="nav-item">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                        <a @click="logout()" >
                            <i class="fa-sharp fa-solid fa-arrow-right-from-bracket"></i>
                            Đăng xuất
                        </a>
                    </router-link>
                    


                    </li>
                    <li  v-if="check_admin() " class="nav-item">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                        <a @click="logout()" >
                            <i class="fa-sharp fa-solid fa-arrow-right-from-bracket"></i>
                            Đăng xuất
                        </a>
                    </router-link>
                    


                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"></a>
                    </li>
                    <li v-if="!check_admin() " class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Đơn hàng
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link :to="{ name: 'order' }">
                                    <span class="dropdown-item">Đơn hành đã đặt</span>
                                </router-link>
                            </li>
                            <li><a class="dropdown-item" href="#">Đơn hành đã đặt</a></li>
                            <li><a class="dropdown-item" href="#">Đơn hành đã giao</a></li>
                            <li><a class="dropdown-item" href="#"></a></li>


                        </ul>
                    </li>

                </ul>
                <div class="d-flex" role="search">
                    <input :value="modelValue" @input="updateModelValue" class="form-control me-2" type="search"
                        placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </div>
                <div class="" v-if="!check_admin() ">
                    <router-link :to="{
                        name: 'card'

                    }">
                        <button type="button" class="btn  position-relative">
                            <span><a><i class=" text-primary fs-3 fa-solid fa-cart-shopping"></i></a></span>

                            <span
                                class="position-absolute top-0 fs-8 start-105 translate-middle badge rounded-pill bg-danger">
                                4
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </button>

                    </router-link>



                </div>
            </div>
        </div>
    </nav>
</template>
<script>

import userService from "@/services/user.service";
export default {

    data() {
        return {
            check_login1: 0,
            token: 0,
            token_admin:0
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.

    },
    computed: {

    },
    methods: {
        check_login() {
            this.token = localStorage.getItem("token");
            this.token_admin = localStorage.getItem("token_admin");
            console.log(this.token)
            if (this.token == null || this.token == 0 || this.token == undefined ) {
                return this.check_login1 = false;
            }
            else {
                return this.check_login1 = true;
            }

        },
        check_admin() {
            this.token_admin = localStorage.getItem("token_admin");
            console.log(this.token)
            if (this.token_admin == null || this.token_admin == 0 || this.token_admin == undefined) {
                return false;
            }
            else {
                return  true;
            }

        },
       
        async logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('token_admin');
            this.$router.push({
                name: "login",
            });

            // location.reload();
        },
        async login() {
            try {
                console.log(this.email);
                console.log(this.password)
                this.data = {
                    email: this.email,
                    password: this.password
                }
                // console.log(this.data)
                this.user = await userService.get_user(this.data);// lay du lieu 
                if (this.user.token) {
                    localStorage.setItem("token", JSON.stringify(this.user.token));
                    this.$router.push({
                        name: "product_manager",
                    });
                    console.log(this.user)
                }
                else {
                    console.log(this.user)
                    this.message = this.user.message;
                }
            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
        this.check_login()
        console.log(this.check_login());
    },
}
</script>


    