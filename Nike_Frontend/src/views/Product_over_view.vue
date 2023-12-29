
<template>
    <section v-if="this.token">
        <ProductOverViewCard v-model:contacts="filteredProduct" v-model:activeIndex="activeIndex" />
    </section>
    <div v-else>
        <h3 class="text-danger text-center">Bạn chưa đăng nhập</h3>
    </div>
</template>
<script>

import InputSearch from "@/components/InputSearch.vue";
import ProductOverViewCard from "@/components/ProductOverViewCard.vue";
import ProductManagerCard from "@/components/ProductManagerCard.vue";
import ProductService from "@/services/product.service";


export default {
    components: {
        
        InputSearch,
        ProductOverViewCard,
        ProductManagerCard
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            searchText: "",
            token:0,

        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        producttrings() {
            return this.products.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredProduct() {
            return this.products;

        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredproduct[this.activeIndex];
        },
        filteredproductCount() {
            return this.filteredproduct.length;
        },
    },
    methods: {
        async retrieveproduct() {
            try {
                this.products = await ProductService.getAll();// lay du lieu 

            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveproduct();
            this.activeIndex = -1;
            //  console.log(this.products); 
        },
        async removeAllproduct() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await productervice.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async check_login() {
            this.token = localStorage.getItem("token");
           // console.log(token)
            if (this.token == null || this.token == 0 || this.token == undefined) {
                return this.token = false;
            }
            else {
                return this.token =true;
            }
        }
    },
    mounted() {
        this.refreshList();
        this.check_login();
        console.log("odngodgnodgnognd");
    },

};
</script>
<style scoped></style>