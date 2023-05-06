

const { ObjectId } = require("mongodb");
class OrderService {
    constructor(client) {
        this.order = client.db().collection("Order");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
        payload.user_id = ObjectId.isValid(payload.user_id) ? new ObjectId(payload.user_id) : null
        //  console.log( payload.order_id);
        const product = [{
            product_id: payload.product_id,
            quantity: payload.quantity
        }
        ]
        const order = {
            products: payload.products,
            user_id: payload.user_id
        };
        // Remove undefined fields
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }
    async createOrder(payload) {
        const order = this.extractConactData(payload);
        const result = await this.order.insertMany(
            order,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async add_list_order(payload) {
        const update = this.extractConactData(payload);// truyen du lieu vao model
        const result = await this.order.insertOne(
            update,
            { writeConcern: { w : "majority", wtimeout : 100 } }
        );
        return result;

    }

    async find(filter) {
        const cursor = await this.order.find(filter);
        return await cursor.toArray();
    }


    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });


    }
    async findCategory(id) {
        return await this.find({
            type_id: ObjectId.isValid(id) ? new ObjectId(id) : null
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);// truyen du lieu vao model
        const result = await this.order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" },
        );
        return result.value;
    }
   

    async delete(id) {
        const result = await this.order.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = OrderService;
