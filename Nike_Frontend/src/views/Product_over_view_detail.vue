<template>
    <div v-if="product" class="row">
        <div class="col-4"></div>

       <div class="col-4 "> <h4 class="text-center m-3">Chi tiết sản phẩm sản phẩm</h4>
        <ProductDetailCard :product="product" @submit:product="updateproduct"/>
        <p>{{ message }}</p></div>
    </div>
    <div class="col-4x"></div>
</template>
<script>
import productForm from "@/components/ProductForm.vue";
import ProductDetailCard from "@/components/ProductDetailCard.vue";
import productService from "@/services/product.service";
export default {
    components: {
        productForm,
        ProductDetailCard
    },
    props: {
        id: { type: String, required: true },// nhan id tu ben ngoai
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async getproduct(id) {
            try {
                this.product = await productService.get(id);// tim va truyen gia tri vao product
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    
                    hash: this.$route.hash,
                }); 
                //console.log(query);
                //console.log(hash);
            }
        },
        async updateproduct(data) {
            try {
                await productService.update(this.product._id, data);
                console.log(data)
                this.message = "Sản phẩm được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteproduct() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await productService.delete(this.product._id);
                    this.$router.push({ name: "productbook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {// khong the truy cap DOM// mounted co the truy cap DOM
        this.getproduct(this.id);
        this.message = "";
    },
};
</script>