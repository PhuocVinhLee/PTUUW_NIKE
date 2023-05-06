const ApiError = require("../api-error");
//const { param } = require("../routes/contact.route");
const OrderService = require("../services//model.order");
const MongoDB = require("../utils/mongodb.util")



exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const orderService = new OrderService(MongoDB.client);
    const {name} = req.query;// == 
    console.log(req.query); //{ name: 'binh' }
    if(name){
      documents = await orderService.findByName(name);// name = red.query.name
    }
    else{
      documents = await orderService.find({});
    }
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving contacts"));
  }

  return res.send(documents);
 
};

exports.findOne = async (req, res, next) => {
  try{
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.findById(req.params.id);
    if(!document){
      return next(new ApiError(400, "Product not found"));
    }
    return res.send(document);
  }catch (error){
    return next(new ApiError(500, `Erro retrieving contact witd id = ${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try{
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(400,"Conact not found"));
    }
    return res.send({message: "Product was updated successfully"});
  } catch(error){
    return next( new ApiError(500,`Error updating contact with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"Conact not found"));
    }
    return res.send({message: "Contact was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete contact with id=${req.params.id}`));
  }
};




exports.add_list_order = async (req, res, next) => {
  if (0) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const orderService = new OrderService(MongoDB.client);
   // console.log(req.body.email);
    const document = await orderService.add_list_order(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the Product")
    );
  }
}; 
exports.create = async (req, res, next) => {
  if (0) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const orderService = new OrderService(MongoDB.client);
   // console.log(req.body.email);
    const document = await orderService.createOrder(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};
