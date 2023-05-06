const ApiError = require("../api-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { param } = require("../routes/contact.route");
const UserService = require("../services//user.service");
const MongoDB = require("../utils/mongodb.util")


exports.create = async (req, res, next) => {
  if (!req.body?.email) {
    return next(new ApiError(400, "Email can not be empty !!!"));
  }
  if (!req.body?.password) {
    return next(new ApiError(400, "Password can not be empty !!!"));
  }
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the user111")
    );
  }
};
exports.findUser = async (req, res, next) => {
  try {
    console.log("hfslfh");
    const userService = new UserService(MongoDB.client);
    console.log("hfslfh");
    const email = req.body.email;
    console.log("444444");
    console.log(email);
    const password = req.body.password;
    console.log(password);
    if (!email || !password) {
      return next(new ApiError(404, "Email và Password không được rỗng"));
    }
    const documents = await userService.findByEmail(email);
    if (!documents) {
      return res.json({message:"User khong ton tai"});
    } else if (!await bcrypt.compare(password, documents.password)) {
      return res.json({message:"Mat khau khong chinh xac"});
    } else {
      const token = jwt.sign({ _id: documents._id }, "secret");
      res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 6 * 1000 })
      return res.json({token: token,documents: documents}) ;
    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving user"));
  }
};

exports.cookie = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const cookie = await req.cookies['jwt'];
    const clains = jwt.verify(cookie,'secret');
    if(!clains){
      return next(new ApiError(400, "An erro occurred while retrieving clains"));
    }
    console.log(clains._id);
    const user = await userService.findById(clains._id) ;
    console.log(clains._id);
    return res.send(user);

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving cookie"));
  }

};

exports.logout = async (req, res, next) => {
  try {
    const logout = await res.cookie('jwt',{maxAge:0});
    
    return res.send("susecfully");

  } catch (error) {
    return next(new ApiError(500, "An erro occurred while logout user"));
  }

};

exports.findEmail = async (req, res, next) => {
  let documents = [];
  try {
    const userService = new UserService(MongoDB.client);

    const email = req.body.email;
    console.log(email);
    documents = await userService.findByEmail(email);
    console.log(documents);
    if (!documents) {
      return next(new ApiError(400, "user not found"));
    }
  } catch (error) {
    return next(new ApiError(500, "An erro occurred while retrieving user"));
  }

  return res.send(documents);
};
