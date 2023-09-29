
//logic for getting all products from mongodb

//1 import product collection
const products=require('../models/productSchema')

//2 create function for getting all products
exports.getAllProducts=async(req,res)=>{
    //get all products from mongodb
    try{
        const allProducts=await products.find()
        res.status(200).json(allProducts) //response send back to client
    }catch{
        res.status(401).json(error) //if error
    }

}

//view a particular product
exports.viewProduct=async(req,res)=>{

    //hold id inside a variable
    const id=req.params.id

    try {
        //check if id present inside mongodb
        const product=await products.findOne({id})

        if(product){
            res.status(200).json(product)
        }else{
            res.statsus(401).json('product not found')
        }
        
    } catch (error) {
        res.status(200).json(error)
    }
}