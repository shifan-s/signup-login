import slugify from "slugify";
import Collection from "../models/collectionSchema.js";

// create collection
export const createCollection = async (req, res) => {
    try {
// get info from the front-end

       const {name} = req.body

// validate info

       if (!name) {
        return  res.status(400).json({
            success: false,
            message: "Please provide collection name"
        });
       }
//check if the collection is existing in database

const existingCollection = await Collection.findOne({name})

// if collection already existing database send response

   if(existingCollection){
    res.status(200).json({
        success : false,
        message : "Collection Already Exist"
    })
   }
// if collection doesnot existing create collection

const collection = await Collection.create({name,slug:slugify(name)})


   // send a success message to the user

   res.status(200).json({
    success : true,
    message : "New collection has been created successfully ",
    collection
   })


     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error in creating collection: ${error}`,
            error
        });
    }
};

// get All Collection


export const getAllCollection = async(req,res)=>{
    try{
       const collection = await Collection.find({})
       res.status(200).json({
       success:true,
       message:"successfully fetched all collection",
       count:collection.length,
       collection
})

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Error in fetching all collection ${error}`,
            error
        })
        
    }
}

// update collection

export const updateCollection = async(req,res)=>{
    try{

const {name} = req.body
const {id} = req.params
const collection = await Collection.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})  
res.status(200).json({
    success:true,
    message:"successfully update the collection",
    collection
})     

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message :`Error in update collection ${error}`,
            error
        })
    }
}


// Delete collection

export const deleteCollection = async(req,res)=>{
    try{
const {id} = req.params
const delCollection = await Collection.findByIdAndDelete(id)

res.status(200).json({
    success:true,
    message:"successfully delete the collection",
    delCollection
})

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Error in delete collection ${error}`,
            error
        })
        
    }
}

// get single collection

export const singleCollection = async(req,res)=>{
    try{
const collection = await Collection.findOne({
    slug:req.params.slug
})
res.status(200).json({
    success:true,
    message:"successfully get single collection",
    collection
})

    }catch(error){
          console.log(error);
          res.status(500).json({
            success:false,
            message:`Error in get single collection ${error}`,
            error
        })
    }
}
