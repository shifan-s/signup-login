import fs from "fs"
import slugify from "slugify";
import Product from "../models/productSchema.js";

export const createProduct = async(req,res)=>{
    try{
const { name, description, price, collection, quantity, shipping } = req.fields
const { photo } = req.files

  if (!name || !description || !price) {
        return res.status(400).json({
            success: false,
            message: "Please provide product name description and price"
        });
       }
if (!photo && photo.size > 1000000){
    return res.status(400).json({
        success : false,
        message : "Photo is required and should not exceed 1MB"
    })
}

const product = new Product({ ...req.fields, slug:slugify(name)});
// if there is photo, we will make some changes in the product we receive
// sinc the data through fs  module and pass the path
if (photo) {
    product.photo.data = fs.readFileSync(photo.path);
    product.photo.contentType = photo.type;   
}
await product.save();
    res.status(201).json({
        success: true,
        message: "New product has been created successfully",
        product,
    });
 }catch(error){
console.log(error);
res.status(500).json({
   success:false,
   message: `Error in creating product ${error}`,
   error
})

    }
}
    

  

// getAllProducts

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo") // Exclude photo buffer from the response
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in fetching all products: ${error}`,
      error,
    });
  }
};


// getSingleProduct

export const singleProduct = async(req,res) => {
try{

// destructure
  const product = await Product.findOne({slug:req.params.slug})
  .select("-photo")
  .populate("collection")

  res.status(200).json({
    success:true,
    message: "successfully get single product",
    product,

  })

}catch(error){
console.log(error);
res.status(500).json({
  success: false,
  message: `Error in get single product: ${error}`,
  error,
})

}
}


// products photo

export const productPhoto = async(req,res)=>{
  try{
    const product = await Product.findById(req.params.pid).select("photo")
    if (product.photo.data) {
      res.set("Content-type",product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }

  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:`Error in getting product photo: ${error}`,
      error
    })
    
  }
}

// delete product

export const deleteProduct = async(req,res)=>{
  try{

    await Product.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).json({
      success:true,
      message:"product has been deleted successfully"
    })


  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:`error in delete product: ${error}`,
      error
    })
    
  }
}
/*

// update product


export const updateProduct = async(req,res)=>{
  try{

    // destructure
    
const {name,description,price,collection,quantity,shipping} = req.fields
const {photo} = req.files


// fields validation

if(!name || !description || !price || !collection || !quantity || !shipping){
  return res.status(400).json({
    success:false,
    message:"fill all the fields"
  })
}

// photo validation

if(!photo && photo.size>1000000){
  res.status(400).json({
    success:false,
    message:"photo is required and should be less than 1MB"
  })
}

// update

const product = await Product.findByIdAndUpdate(
  req.params.pid,
  {...req.fields,slug:slugify(name)},
  {new:true} 
)
if(photo) {
  product.photo.data = fs.readFileSync(photo.path);
  product.photo.contentType = photo.type;
}
await product.save();
res.status(201).json({
  success:true,
  message:"product updated successfully",
  product,
})

  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:`Error in update product: ${error}`,
      error
    })
    
  }
}
  
*/

// Update Product


export const updateProduct = async (req,res) =>{
  try{
const { name, description, price, collection, quantity, shipping } = req.fields;
const { photo } = req.files;


// Build list of missing fields

const missingFields = [];
if (!name) missingFields.push("name");
if (!description) missingFields.push("description");
if (!price) missingFields.push("price");
if (!collection) missingFields.push("collection");
if (!quantity) missingFields.push("quantity");
if (!shipping) missingFields.push("shipping");


if (missingFields.length) {
  return res.status(400).json({
    success: false,
    message: `missing required fields: ${missingFields.join(", ")}`
  });
}

if (photo && photo.size > 1_000_000) {
  return res.status(400).json({
    success: false,
    message: "photo should be less than 1MB",
  })
}

const product = await Product.findByIdAndUpdate(
  req.params.pid,
  {...req.fields, slug: slugify(name) },
  { new: true}
);

if (photo) {
  product.photo.data = fs.readFileSync(photo.path);
  product.photo.contentType = photo.type;
}

await product.save();

res.status(200).json({
  success: true,
  message: "Product updated successfully" ,
  product,
});


  }catch(error){
console.error("Error in Updating Product:",error);
res.status(500).json({
  success: false,
  message: "Error in updating the product",
  error: error.message,
})
  }
}


// Product Filter

export const filterProduct  = async (req,res)=>{
try{

  const { checked,radio} = req.body;
  let args = {}

  // we will have collection in the args so fullfill its value with checked

if (checked.length>0) args.collection = checked

// user can select only one radio so we can directly check the value using mongoDB theory

if (radio.length) args.price = {$gte : radio[0], $lte :radio[1]}

const products = await Product.find(args)
res.status(200).json({
  success: true,
  message:"successfully filtered products",
  products
})


}catch(error){
  console.log(error);
  res.status(500).json({
    success:false,
    message:"Error while filtering products",
    error
  })
  
}

}

// Product Count

// The .estimatedDocumentCount() is an in-built method of MongoDB to estimate the number of documents in a collection

export const productCount = async (req, res) => {
  try {
    const totalProducts = await Product.find({}).estimatedDocumentCount();
    res.status(200).json({
      success: true,
      totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};



// Product list based on page

export const productList = async (req,res) => {
  try{

// set the number of products per page

const perPage = 3;
const page = req.params.page ?req.params.page : 1;
const products = await Product.find({})
.select("-photo")
.skip((page -1) * perPage)    //.skip((page - 1) * perPage) in Mongoose is used for pagination — it tells MongoDB how many documents to skip before starting to return results.
.limit(perPage)
.sort({ createdAt: -1 })
res.status(200).json({
  success : true,
  products,
});
  }catch (error) {
    console.log(error);
    res.status(400).json({
      success : false,
      message : "error in per page ctrl",
      error,
    });
  }
};


