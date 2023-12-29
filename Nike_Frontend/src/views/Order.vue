
<template>
    <section>
        <section>
        

        <table id="orders"
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
            <tbody v-for="(order, index) in orders" :key="order._id" >

                <tr v-for="(product, index) in order.products" :key="product._id">
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
                                            <button type="button" @click="deleteorder(product._id)"
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
    </section>
</template>
<script>

import orderService from "@/services/order.service";
import productService from "@/services/product.service";
export default {
    components: {
       
    },
    data() {
        return {
            orders: [], 
            products:[],  
            ordersLocal: [],     
        };
    },
    watch: {
       
        
    },
    computed: {
        
        
    },
    methods: {
        async retrieveorder() {
            try {
                this.orders = await orderService.getAll();// lay du lieu
                this.orders.forEach(async (value, index) => {
                    
                    value.products.forEach(async (product, index) => {
                       product = await productService.get(product.product_id);
                       this.products.push(product);
                       
                    });
                    value = [];
                    this.orders.push(this.products);
                    this.products = [];
                    });

                    console.log(this.orders);
               
                
            } catch (error) {
                console.log(error);
            }
        },
       
    },
    mounted() {
        this.retrieveorder();
        
    },

};
</script>
<style scoped>

</style>