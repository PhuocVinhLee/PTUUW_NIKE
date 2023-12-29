<script>
import ProductService from "@/services/product.service";
export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteProduct(id) {
            try {
                await ProductService.delete(id);
                location.reload();
                // $router.push({ name: "product_manager" });

            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<template>
    <section>
        <router-link :to="{
            name: 'product_manager.add',
        }" class="btn btn-primary" style="margin-bottom: 10px;">
            <i alt="add" class="fa fa-plus"> </i>
            Thêm sản phẩm
        </router-link>

        <table id="products"
            class="table table-striped table-responsive table-bordered text-center align-items-center align-self-center">
            <thead>
                <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Giới tính sản phẩm</th>
                    <th scope="col">Số lượng kho</th>
                    <th scope="col">Tên loại</th>
                    <th>Mô tả</th>
                    <th scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="(product, index) in products" :key="product._id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td> {{ product.name }}</td>
                    <td>{{ product.price }}</td>

                    <td style="width: 150px; height: 100px;"><img style="width: 100%; height: 100%;" :src=product.image_url>
                    </td>

                    <td>{{ product.gender }}</td>
                    <td>{{ product.quantity }}</td>

                    <td>{{ product.type_id }}</td>
                    <td>
                        <div class="dropdown">
                            <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                data-bs-toggle="dropdown" aria-expanded="false">

                            </a>

                            <ul class="dropdown-menu p-4 text-muted" style="max-width: 200px;"
                                aria-labelledby="dropdownMenuLink">
                                <li>
                                    <p class="dropdown-item">{{ product.describe }}</p>
                                </li>

                            </ul>
                        </div>
                    </td>
                    <td class="text-center">

                        <router-link :to="{
                            name: 'product_manager.edit',
                            params: { id: product._id },
                        }" class="btn btn-xs btn-warning mb-1">
                            <i alt="Edit" class="fa fa-pencil"> Edit</i>
                        </router-link>
                        <div></div>
                        <div action="/" method="POST" style="display: inline;">
                            <input type="hidden" name="id" value="<?= $sanpham->getId() ?>">
                            <button type="button" class="btn btn-xs btn-danger" data-bs-toggle="modal"
                                data-bs-target="#exampleModal_delete">
                                <i alt="Delete" class="fa fa-trash"> Delete</i></button>
                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal_delete" tabindex="-1"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Trang sức thông báo</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Bạn có chắc muốn xóa sản phẩm <span class="h5"></span> ?.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                            <button type="button" @click="deleteProduct(product._id)"
                                                data-bs-dismiss="modal" class="btn btn-primary">Save
                                                changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>


            </tbody>
        </table>
    </section>
</template>
<style scoped>
/*
<ul class="list-group">
        <li class="list-group-item" v-for="(product, index) in products" :key="product._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ product.name }}
        </li>
    </ul>
*/</style>