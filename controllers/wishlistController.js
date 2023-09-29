
//importing wishlist schema
const wishlists=require('../models/wishlistSchema')

//lkogic for adding product to wishlist
exports.addToWishlist=async(req,res)=>{

   //destructuring to pass data to the wishlist
   const{id,title,price,image}=req.body

 

   try{
      //check if product is alreeady present
      const item= await wishlists.findOne({id})
      if(item){
        //sending response back to the fronmtend
        res.status(403).json('Product already present')
      }else{
        //add new product to wishlist
        const newProduct=new wishlists({id,title,price,image})
        await newProduct.save()
        res.status(200).json('product added to wishlist')
      }
   }catch(error){
    res.status(400).json(error)
   }
}

//to get wishlist items
exports.getWishlistProducts=async(req,res)=>{
  try {
    const items=await wishlists.find()
    res.status(200).json(items)
    
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete wishlist
exports.deleteItem=async(req,res)=>{
  
  const {id}=req.params

  try {

    ///deleting a product that was added to the wishlist
   const removeProduct= await wishlists.deleteOne({id})
    

    if(removeProduct){

      //fetch the remainning products to the backend
      const Items=await wishlists.find()
      res.status(200).json(Items)
    }
    
  } catch (error) {
    res.status(400).json(error)
  }
  
}
