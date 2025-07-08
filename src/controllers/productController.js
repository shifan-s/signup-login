import fs from "fs";
import Product from "../models/productSchema.js";
import slugify from "slugify";
export const  createProduct=async(req,res)=>{

try{
 const  {name,description,price,collection,quantity,shipping}=req.fields
 const{photo}=req.files
 //validating
 if(!name|| !description|| !price){
    return res.status(400).json({
        success:false,
        message:"please provide product name description and price"
    });
 }
 //size shouldnot exceed 1 MB
 if(!photo && photo.size>1000000){
    return res.status(400).json({
        success:false,
        message: `photo is required and shopuldnot exceed 1 MB`
    })
 }
 const product = new Product({...req.fields,slug:slugify(name)});
 //if there is photo ,we will make some changes in the  product we recive 
 //since the data throough fs module and pass the path
 if(photo){
    product.photo.data =fs.readFileSync(photo.path);
    product.photo.contentType = photo.type;

 }

await product.save();
res.status(201).json({
    success:true,
    message:"new product has been created successfully",
    product,
});

}catch(error){
              console.log(error);
              res.status(500).json({
                success:false,
                message:`error in creating product ${error}`,
                error
              })


}

}
// Get All product
export const getallproducts = async(req,res)=>{
    try{
const products = await Product.find({}).select("-photo").limit(12).sort({createdAt:-1})
res.status(200).json({
    success:true,
    message:"All products fetched succesfully",
    products
})

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`error in getting the products ${error}`,
            error
        })
    }
}


// Get single Product
export const singleProduct = async(req,res) =>{
    try{
        const product = await Product.findOne({slug:req.params.slug}).select("-photo").populate("collection")
        res.status(200).json({
            success:true,
            message:`Successfully Got Single Product`,
            product
        })

    }catch(error){
        console.log(error),
        res.status(500).json({
            success :false,
            message:`error in getting single product ${error}`,
            error
        })
    }
}

// Product Photo

export const  productPhoto = async(req,res) =>{
    try{
      const product = await Product.findById(req.params.pid).select("photo")
      if(product.photo.data){
        res.set("Contetnt-type",product.photo.contentType)
        return res.status(200).send (product.photo.data)    
     }
    }catch(error){
        console.log(error),
        res.status(500).json({
            success:false,
            message:`Error in getting the Photo ${error}`,
            error
        })
    }
} 

//Delete PRoduct

export const deleteProduct = async(req,res) =>{
    try{
        await Product.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).json({
            success:true,
            message:`Successfully Deleted the product`
        })

    }catch(error){
        console.log(error),
        res.status(500).json({
            success:false,
            message:`Error in deleting product ${error}`,
            error
        })
    }
}

//update product
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