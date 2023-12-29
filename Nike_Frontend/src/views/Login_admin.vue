<template>
    <div class="row">
        <div class="col"></div>
        <div class="col-5 ">
            <h3 class="text-center">Chào mừng Admin!</h3>
            <div class="">
                <div id="login" class="was-validated" method="POST" action="" style="display: inline;">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input v-model="email" name="admin_email" type="email" class="form-control is-valid" id="email"
                            required>
                        <div id="email_feedback" class="invalid-feedback"> Vui lòng nhập Email</div>

                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input v-model="password" name="admin_password" type="password" class="form-control is-valid"
                            id="password" required>
                        <div class="invalid-feedback">Vui lòng nhập Mật khẩu</div>
                    </div>
                    <input name="vaitro" type="text" hidden value="1">
                    <div class="mb-3">
                        <div class="text-danger">  {{ message }}</div>
                       
                    </div>

                    <button type="" @click="login()" class="btn btn-primary">Submit</button>

                    <div class="my-3"><a href="">Quên mật khẩu</a></div>
                </div>

            </div>
        </div>
        <div class="col"></div>
    </div>
</template>

<script>

import adminService from "@/services/admin.service";
export default {

    data() {
        return {
            admin: "",
            email: "",
            password: "",
            data: "",
            message: ""

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
        async login() {
            try {
                console.log(this.email);
                console.log(this.password)
                this.data = {
                    email: this.email,
                    password: this.password
                }
                // console.log(this.data)
                this.admin = await adminService.get_user(this.data);// lay du lieu 
                if (this.admin.token) {
                    localStorage.setItem("token_admin", JSON.stringify(this.admin.token));
                   // location.reload();
                    this.$router.push({
                    name: "product_manager",
                });
                    console.log(this.admin)
                }
                else {
                    console.log(this.admin)
                    this.message = this.admin.message;
                }
            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {

    },
}
</script>