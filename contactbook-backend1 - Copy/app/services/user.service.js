const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');

class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }
  //const satl = await bcrypt.hash(req.body.password,satl);
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  async extractConactData(payload) {
    const user = {
      email: payload.email,
      password: await this.password1(payload.password),// bam
    };
    // Remove undefined fields
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }
    async password1(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword =  await bcrypt.hash(password,salt);
    console.log(hashedpassword);
    return hashedpassword;
  }
  async create(payload) {
    const user =  await this.extractConactData(payload);
    console.log(payload.password);
    console.log(payload.email);
    console.log(user.password);
    const result = await this.User.findOneAndUpdate(
      user,
      { $set: { } },
      { returnDocument: "after", upsert: true }
    )

    // const {password, ...data} = await result.toJSON();
    return result.value;
  }

  async findByEmail(email) {
    return await this.User.findOne({
      email: { $regex: new RegExp(email), $options: "i" },
    });
  }
  async findById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  


}
module.exports = UserService;
