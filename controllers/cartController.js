
//importing cart schema(model)
const carts=require('../models/cartSchema')

//logic to add to cart
exports.addToCart=async(req,res)=>{

    //get product details from the request
    const {id,title,price,image,quantity}=req.body

    //logic
    try {
        //check if the product is already in cart
        const products=await carts.findOne({id})

        if(products){
            //if products present in cart increase the quantity
            products.quantity+=1

            //update the grand total
            products.grandTotal=products.price*products.quantity

            //save it to mongodb
            products.save()

            //give the response
            res.status(200).json('Product incremented successfully')
        }else{
            //add the product if not added to cart
            const newProduct=new carts({
                id,title,price,image,quantity,grandTotal:price
            })

            //save new product details
            newProduct.save()
            
            //give the response
            res.status(200).json('Product added successfully')

        }
        
    } catch (error) {
        //give the response
        res.status(400).json(error)
    }

}

//getting items added to cart
exports.getCartItem=async (req,res)=>{
    try {
        const products=await carts.find()
        res.status(200).json(products)
        
    } catch (error) {
        res.status(400).json('Not found')
    }
}

//deleting an item from cart
exports.deleteCartItem=async (req,res)=>{
    try {

        const {id}=req.params
        const removed=await carts.deleteOne({id})
        if(removed.deleteCount!=0){
            const remainingProducts=await carts.find()
            res.status(200).json(remainingProducts)
        }
    
        
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//incrementing a product
exports.productIncrement=async(req,res)=>{

    const{id}=req.params
    try {
        const product=await carts.findOne({id})
    if(product){
        product.quantity+=1
        product.grandTotal=product.quantity*product.price
        await product.save()

        const allProducts=await carts.find()
        res.status(200).json(allProducts)

    }
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//product decrement
exports.productDecrement=async(req,res)=>{
    const{id}=req.params
    try {
        const product=await carts.findOne({id})
        if(product){
        product.quantity-=1
        if(product.quantity==0){
            await carts.deleteOne({id})
            const allProducts=await carts.find()
            res.status(200).json(allProducts)
        }else{
            product.grandTotal=product.price*product.quantity

            await product.save()
    
            const allProducts=await carts.find()
            res.status(200).json(allProducts)
        }
        
       

        
        
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
}