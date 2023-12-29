<script>
export default {
    props: {
        product: { type: Object, required: true },
    },
};
</script>
<template>
    <div class="row ">
        <div class="col my-2">

            <div class="text-center" > <img id="img" style="width: 300px; height: 300px;" :src=product.image_url alt="err" srcset="">
            </div>
            <div class="row  text-center">
                <h6>{{ product.name }}</h6>
            </div>
            <div class="row  text-center">
                <h6>{{ product.describe }}</h6>
            </div>
            <div class="row ">
                <div class="col">
                    <h6>Kho: {{ product.quantity }}</h6>
                </div>
                <div class="col text-end">
                    <h6 class="mr-0 text-end"> Giá: {{ product.price }} đ </h6>
                </div>
            </div>
            <div name="themgiohang" class="row delete">
                <div class="col-8">
                    <input hidden type="text" value="<?= $sanpham->gia ?>" name="gia_sp">
                    <input hidden type="text" value="<?= $sanpham->getId() ?>" name="id_sp">
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Thêm vào giỏ hàng
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 " id="exampleModalLabel">Giỏ hàng cho biết</h1>
                                </div>
                                <div class="modal-body">
                                    <p class="text-start">Bạn đã thêm sản phẩm vào giỏ hàng!</p>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-secondary" data-bs-dismiss="modal">Oke</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 text-end fs-5"><input name="soluong" type="number" value="0" min="0" max="20"></div>
            </div>

        </div>
    </div>
</template>