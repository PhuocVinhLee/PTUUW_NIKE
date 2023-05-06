

const { ObjectId } = require("mongodb");
class ProductService {
    constructor(client) {
        this.Product = client.db().collection("Product");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
      payload.type_id = ObjectId.isValid(payload.type_id) ? new ObjectId(payload.type_id) : null
      console.log( payload.product_id);
        const product = {
            name: payload.name,
            gender: payload.gender,
            image_url: payload.image_url,
            quantity: payload.quantity,
            price: payload.price,
            type_id: payload.type_id,
            describe: payload.describe
        };
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }
    async createProduct(payload) {
        const product = this.extractConactData(payload);
        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: { } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }


    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

       
    }
    async findCategory(id) {
        return await this.find({ 
            type_id: ObjectId.isValid(id) ? new ObjectId(id) : null });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);// truyen du lieu vao model
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }



    async delete(id) {
        const result = await this.Product.findOneAndDelete({
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
module.exports = ProductService;
