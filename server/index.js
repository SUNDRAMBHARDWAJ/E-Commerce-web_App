const express = require('express');
const cors = require('cors');
const session = require("express-session")
const cookieParser = require('cookie-parser')
const app = express();
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))
app.get('/api',(req,res)=>{
    res.send(JSON.stringify({arr:["us1","us2","us3","us4"]}))
})
app.get('/',(req,res)=>{
    res.send("lalalalala")
})
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const signinRoute = require('./routes/Signin')
const signupRoute = require('./routes/Signup')
const verificationRoute = require('./routes/Verification')
const homeRoute = require('./routes/user');
const adminRoute = require('./routes/Admin')
const sellerRoute = require('./routes/Seller');
const verifyToken = require('./middlewares/VerifyToken');
app.use('/signin',signinRoute);
app.use('/signup',signupRoute)
app.use('/verifyEmail',verificationRoute);
app.use('/users',homeRoute);
app.use('/admin',adminRoute)
app.use('/seller',sellerRoute)
app.get('/testtoken',verifyToken,(req,res)=>{
    console.log("This is id ",res.id,res.type)
    res.json({verify:true,type:res.type})
})
app.get('/logout',verifyToken,(req,res)=>{
    res.clearCookie('JWT')
    res.status(400).send('Logged Out')
})
app.listen('3000',()=>{
    console.log("Server Started At port 3000")
})