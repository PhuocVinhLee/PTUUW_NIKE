const ApiError = require("../api-error");
//const { param } = require("../routes/contact.route");
const ProductService = require("../services//model.product");
const MongoDB = require("../utils/mongodb.util")


exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty 11!!!"));
  }
  try {
    const productService = new ProductService(MongoDB.client);
    //console.log(req.body);
    const document = await productService.createProduct(req.body);
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
        const productService = new ProductService(MongoDB.client);
      const {name} = req.query;// == 
      console.log(req.query); //{ name: 'binh' }
      if(name){
        documents = await productService.findByName(name);// name = red.query.name
      }
      else{
        documents = await productService.find({});
  
      }
    } catch (error){
      return next( new ApiError(500, "An erro occurred while retrieving contacts"));
    }
  
    return res.send(documents);
   
  };


exports.findOne = async (req, res, next) => {
    try{
      const productService = new ProductService(MongoDB.client);
      const document = await productService.findById(req.params.id);
      console.log(req.params.id);
      console.log(document);
      if(!document){
        return next(new ApiError(400, "Product 111 not found"));
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
    const productService = new ProductService(MongoDB.client);
      const document = await productService.update(req.params.id, req.body);
      if(!document){
        return next(new ApiError(400,"Conact not found"));
      }
      return res.send({message: "Product was updated successfully"});
    } catch(error){
      return next( new ApiError(500,`Error updating Product with id=${req.params.id}`));
    }
  };
  
  exports.delete = async (req, res, next) => {
    try{
        const productService = new ProductService(MongoDB.client);  
      const document = await productService.delete(req.params.id);
      if(!document){
        return next(new ApiError(404,"Product not found"));
      }
      return res.send({message: "Product was delete successfully"});
    } catch(error){
      return next( new ApiError(500,`Error delete product with id=${req.params.id}`));
    }
  };

  exports.findCategory = async (req, res , next) => {
    try{
      const productService = new ProductService(MongoDB.client);
      const documents = await productService.findCategory(req.params.id);
      return res.send(documents);
    } catch(error){
      return next( new ApiError(500," An occurred while retrieving catorygy product" ));
    }
  };
  
  
  
