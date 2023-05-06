const ApiError = require("../api-error");
//const { param } = require("../routes/contact.route");
const TypeService = require("../services//model.type");
const MongoDB = require("../utils/mongodb.util")


exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const typeService = new TypeService(MongoDB.client);
    //console.log(req.body);
    const document = await typeService.createType(req.body);
    //console.log(document);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};


exports.findAll = async (req, res, next) => {
  let documents = [];
  try{
    const typeService = new TypeService(MongoDB.client);
    const {name} = req.query;// == 
    console.log(req.query); //{ name: 'binh' }
    if(name){
      documents = await typeService.findByName(name);// name = red.query.name
    }
    else{
      documents = await typeService.find({});
    }
  } catch (error){
    return next( new ApiError(500, "An erro occurred while retrieving Type"));
  }

  return res.send(documents);
 
};
exports.findOne = async (req, res, next) => {
  try{
    const typeService = new TypeService(MongoDB.client);
    const document = await typeService.findById(req.params.id);
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
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if(!document){
      return next(new ApiError(400,"Conact not found"));
    }
    return res.send({message: "Contact was updated successfully"});
  } catch(error){
    return next( new ApiError(500,`Error updating contact with id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try{
    const typeService = new TypeService(MongoDB.client);
    const document = await typeService.delete(req.params.id);
    if(!document){
      return next(new ApiError(404,"Conact not found"));
    }
    return res.send({message: "Contact was delete successfully"});
  } catch(error){
    return next( new ApiError(500,`Error delete contact with id=${req.params.id}`));
  }
};




