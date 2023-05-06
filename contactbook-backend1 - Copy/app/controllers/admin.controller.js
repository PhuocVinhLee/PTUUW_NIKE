const ApiError = require("../api-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { param } = require("../routes/contact.route");
const AdminService = require("../services//model.admin");
const MongoDB = require("../utils/mongodb.util")


exports.create = async (req, res, next) => {
  if (!req.body?.email) {
    return next(new ApiError(400, "Email can not be empty !!!"));
  }
  if (!req.body?.password) {
    return next(new ApiError(400, "Password can not be empty !!!"));
  }
  try {
    const adminService = new AdminService(MongoDB.client);
    const document = await adminService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the Admin111")
    );
  }
};
exports.findAdmin = async (req, res, next) => {
  try {
    console.log("hfslfh");
    const adminService = new AdminService(MongoDB.client);
    console.log("hfslfh");
    const email = req.body.email;
    console.log("444444");
    console.log(email);
    const password = req.body.password;
    console.log(password);
    if (!email || !password) {
      return next(new ApiError(404, "Email và Password không được rỗng"));
    }
    const documents = await adminService.findByEmail(email);
    if (!documents) {
      return res.json({message:"Admin khong ton tai"});
    } else if (!await bcrypt.compare(password, documents.password)) {
      return res.json({message:"Mat khau khong chinh xac"});
    } else {
      const token = jwt.sign({ _id: documents._id }, "secret");
      res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 6 * 1000 })
      return res.json({token: token,documents: documents}) ;
    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving Admin"));
  }
};

exports.cookie = async (req, res, next) => {
  try {
    const adminService = new AdminService(MongoDB.client);
    const cookie = await req.cookies['jwt'];
    const clains = jwt.verify(cookie,'secret');
    if(!clains){
      return next(new ApiError(400, "An erro occurred while retrieving clains"));
    }
    console.log(clains._id);
    const Admin = await adminService.findById(clains._id) ;
    console.log(clains._id);
    return res.send(Admin);

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving cookie"));
  }

};

exports.logout = async (req, res, next) => {
  try {
    const logout = await res.cookie('jwt',{maxAge:0});
    
    return res.send("susecfully");

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while logout Admin"));
  }

};

exports.findEmail = async (req, res, next) => {
  let documents = [];
  try {
    const adminService = new AdminService(MongoDB.client);

    const email = req.body.email;
    console.log(email);
    documents = await adminService.findByEmail(email);
    console.log(documents);
    if (!documents) {
      return next(new ApiError(400, "Admin not found"));
    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving Admin"));
  }

  return res.send(documents);
};
