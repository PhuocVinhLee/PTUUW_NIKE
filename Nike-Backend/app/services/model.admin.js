const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');

class AdminService {
  constructor(client) {
    this.Admin = client.db().collection("Admin");
  }
  //const satl = await bcrypt.hash(req.body.password,satl);
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  async extractConactData(payload) {
    const Admin = {
      email: payload.email,
      password: await this.password1(payload.password),// bam
    };
    // Remove undefined fields
    Object.keys(Admin).forEach(
      (key) => Admin[key] === undefined && delete Admin[key]
    );
    return Admin;
  }
    async password1(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword =  await bcrypt.hash(password,salt);
    console.log(hashedpassword);
    return hashedpassword;
  }
  async create(payload) {
    const Admin =  await this.extractConactData(payload);
    console.log(payload.password);
    console.log(payload.email);
    console.log(Admin.password);
    const result = await this.Admin.findOneAndUpdate(
      Admin,
      { $set: { } },
      { returnDocument: "after", upsert: true }
    )

    // const {password, ...data} = await result.toJSON();
    return result.value;
  }

  async findByEmail(email) {
    return await this.Admin.findOne({
      email: { $regex: new RegExp(email), $options: "i" },
    });
  }
  async findById(id) {
    return await this.Admin.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  


}
module.exports = AdminService;
