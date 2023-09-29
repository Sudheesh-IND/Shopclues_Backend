
//import mongoose
const mongoose=require('mongoose')

//create schema
const cartSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
    ,
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    grandTotal:{
        type:Number,
        required:true
    }
})

//make a model called carts to store the products in carts
const carts=new mongoose.model('carts',cartSchema)

//exporting the model
module.exports=carts