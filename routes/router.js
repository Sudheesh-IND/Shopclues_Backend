//to define routes for client requests

//import express
const express=require('express')

//2 using exprss to create routes
const router=express.Router()

//4 importing product  controller
const productController=require('../controllers/productController')

//importing wishlist controller
const wishlistController=require('../controllers/wishlistController')

//importing cart contoller
const cartController=require('../controllers/cartController')

//3 use router object to resolve client request
    //get all aproducts api request

router.get('/products/all-products',productController.getAllProducts)

//route to get a particular profduct
router.get('/products/viewproduct/:id',productController.viewProduct)

//add product to wishlist

router.post('/wishlist/addtowishlist',wishlistController.addToWishlist)

//get products that are added to wishlist
router.get('/wishlist/getwishlist',wishlistController.getWishlistProducts)

//delete item from wishlist
router.delete('/wishlist/delete/:id',wishlistController.deleteItem)

//adding cart items to mongodb
router.post('/carts/addtocart',cartController.addToCart)

//get items added to cart
router.get('/carts/getcartitem',cartController.getCartItem)

//deleting an item from cart
router.delete('/carts/deletecartitem/:id',cartController.deleteCartItem)

//incrementing an item
router.get('/carts/increment/:id',cartController.productIncrement)

//decrementing count of an item
router.get('/carts/decrement/:id',cartController.productDecrement)

module.exports=router