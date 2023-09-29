
//1 automatically load .env file into the application

require('dotenv').config()

//2 import express
const express=require('express')

//import connection.js
require('./connection')

//import the router
const router=require('./routes/router')

//import cors
const cors=require('cors')

//3 creating applicatio using express
const server=express()

//4 define the PORT
const PORT=5000

//use cors in server app
server.use(cors())
server.use(express.json()) //to convert object data to an array
server.use(router)

//5 run the server
server.listen(PORT,()=>{
    console.log('server listening to port ' +PORT)
})

//now start to define routes
server.get('/',(req,res)=>{
    res.status(200).json('E commerce application started')
})