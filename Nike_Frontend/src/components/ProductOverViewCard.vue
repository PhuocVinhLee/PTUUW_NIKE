<script>
export default {
   
    props: {
        contacts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            card: {
                _id: -1,
                quantity: 0
            },
            order: [],
            soluong:0,

        };
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        ok(){
           // location.reload();
        },
        async add_localstorage(product_id, quantity) {
            try {
                this.card._id = product_id;
                this.card.quantity = quantity;
                //  await this.order.push(this.card);
                //  JSON.parse(localStorage.getItem("storeData"))
                this.order = await JSON.parse(localStorage.getItem("order"));
                //  console.log(this.order);
                if (this.order != null) {
                    this.order.forEach((value, index) => {
                        if (this.card._id == value._id) {
                            console.log("bang nhau");
                            // this.order.pop();
                            value.quantity = value.quantity + this.card.quantity;
                            localStorage.setItem("order", JSON.stringify(this.order));
                           //quantity =0
                           this.soluong=0;
                            return this.order = [];
                        }
                        else if (this.order.length == index + 1) {
                            this.order.push(this.card);
                            localStorage.setItem("order", JSON.stringify(this.order));
                            console.log("khong bang nhau");
                          // quantity = 0
                          this.soluong=0;
                            //  alert(" Ban da them san pham vao gio hang");
                            return this.order = [];
                        }
                    });
                }
                else {// lan dau tien
                    this.order = [];
                    this.order.push(this.card);
                    localStorage.setItem("order", JSON.stringify(this.order));
                    //  alert(" Ban da them san pham vao gio hang");
                    console.log("bat dau");
                  // quantity =0
                  this.soluong=0;
                    return this.order = [];
                }
                // localStorage.removeItem("order");



            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
<template>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-4 my-4">

        <div class="col my-2 " v-for="(contact, index) in contacts" :key="contact._id">

            <div class="btn ">
                <router-link :to="{
                    name: 'product_over_view_detail',
                    params: { id: contact._id },
                }" class="py-5">
                    <img id="img" style="width: 100%;" :src=contact.image_url alt="err" srcset="">
                </router-link>


                <div class="row  text-center">
                    <h6>{{ contact.name }}</h6>
                </div>
                <div class="row ">
                    <div class="col">
                        <h6>Kho: {{ contact.quantity }}</h6>
                    </div>
                    <div class="col text-end">
                        <h6 class="mr-0 text-end"> Giá: {{ contact.price }} đ </h6>
                    </div>
                </div>
                <div name="themgiohang" class="row delete">
                    <div class="col text-center">
                        <input hidden type="text" value="<?= $sanpham->gia ?>" name="gia_sp">
                        <input hidden type="text" value="<?= $sanpham->getId() ?>" name="id_sp">

                       <div class="text-center">
                        <button @click="add_localstorage(contact._id, 1)" type="button" class=" btn btn-primary"
                            data-bs-toggle="modal"  data-bs-target="#addlocalto">
                            Thêm vào giỏ hàng
                        </button>
                       </div>
                        <div class="modal fade" id="addlocalto" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn đã thêm {{contact.name}} sản phẩm vào giỏ hàng
                                    </div>
                                    <div class="modal-footer">
                                        <button @click="ok" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Oke</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>


        </div>
    </div>
</template>
<style >
/*
<ul class="list-group">
        <li class="list-group-item" v-for="(contact, index) in contacts" :key="contact._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ contact.name }}
        </li>
    </ul>
*/
</style>