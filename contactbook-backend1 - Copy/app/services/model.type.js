const { ObjectId } = require("mongodb");
class TypeService {
    constructor(client) {
        this.Type = client.db().collection("Type");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
      payload.product_id = ObjectId.isValid(payload.product_id) ? new ObjectId(payload.product_id) : null
      console.log( payload.product_id);
        const type = {
            name: payload.name,
            product_id: payload.product_id
           
        };
        // Remove undefined fields
        Object.keys(type).forEach(
            (key) => type[key] === undefined && delete type[key]
        );
        return type;
    }
    async createType(payload) {
        const type = this.extractConactData(payload);
        const result = await this.Type.findOneAndUpdate(
            type,
            { $set: { } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Type.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Type.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Type.findOneAndDelete({
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
module.exports = TypeService;
