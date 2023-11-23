const authServices = require('../services/Authentication');
const { saveTheUsers, saveToOrdersAndReduceProductQuantity, SetOtp, GetOtp } = require('../services/userServices');
const verifyEmail = require("../methods/sendEmail")
const {verification} = require('../services/Authentication')
const jwt = require('jsonwebtoken')
const MY_SECRET_KEY = "Thisis%6557766252552";
const showSignUp = (req,res)=>{
    res.render('signup',{info:null})
}
const saveNewusers = (req,res)=>{
    let x = req.body.formData;
    console.log(x)
    const username = x.username;
    x.isVerified = 0;
    console.log(x);
    authServices.findOneuser(username)
    .then((udata)=>{
        console.log(udata)
        if(udata){
            if(udata.email === x.email){
                res.status(400).send("Email and Username Already Exist");
            }else{
                res.status(400).send("Username Already exist");
            }
        }else{
            saveTheUsers(x);
            res.status(200).json(true)
        }
    })
    .catch((error) => {
        console.log(error);
       res.send(400, "Bad Request");
   });
}

const signin = (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body)
    authServices.findOneuser(username)
    .then((foundUser) => {
        if(foundUser){
            if(foundUser.password === password){
                const token = jwt.sign({id:foundUser._id,type:foundUser.isSeller},MY_SECRET_KEY,{
                    expiresIn:"2hr"
                })
                if(foundUser.isAdmin){
                    req.session.isAdmin = true;
                    req.session.SellerId = foundUser._id;
                    res.cookie('JWT',token,{
                        path:'/',
                        expires:new Date(Date.now() + 1000*3000000000),
                        httpOnly:true,
                       })

                }else if(foundUser.isSeller){
                    res.cookie("JWT",token,{
                        path:'/',
                        expires:new Date(Date.now() + 1000*30000),
                        httpOnly:true,
                        })
                    res.json({type:"Seller",foundUser})
                }else{ 
                    res.cookie("JWT",token,{
                        path:'/',
                        expires:new Date(Date.now() + 1000*30000),
                        httpOnly:true,
                        })
                    res.json({type:"User",foundUser})
                }
            }else{
                res.status(400).json("Invalid Password")
            }
        }else{
            res.status(400).json("User not Exist")
        }
   })
   .catch((error) => {
        console.log(error);
       res.send(400, "Bad Request");
   });
}

const showSignIn = (req,res)=>{
    res.render('signin',{info:null});
}


const emailVerification = (req,res)=>{
    const email = req.body.email;
    const otp = generateOtp();
    SetOtp(email,otp)
    .then((retdata)=>{
        console.log(retdata)
        if(retdata.rowsAffected[0] === 1){
            verifyEmail(email,otp,(err,data)=>{
                if(err){
                    res.status(400).send('Bad Request')
                }else{
                    res.json({got:email})
                }
            })
        }
    }).catch((err)=>{
        console.log(err)
    })
}
function generateOtp(){
    return ("" + Math.random()).substring(2,8);
}

const setVerified = (req,res)=>{
    console.log(req.body.otp+" "+req.user)
    const email = req.body.email
    const otp = req.body.otp
    GetOtp(email)
    .then((data)=>{
        if(Number(otp) === data.recordset[0].otp){
            console.log(data)
            verification(email)
            .then((data)=>{
                if(data.rowsAffected[0] === 1){
                    res.json(true);
                }
            }).catch((err)=>{
                console.log("gadbad")
                res.json(false);
                
            })
        }else{
            res.json(false);
        }
    }).catch((err)=>{
        console.log("lalallalallalla")
        console.log(err)
    })
    // if(req.currotp === req.body.otp){
    //    console.log("lalalalal",req.Tempusername)
    //     verification(req.Tempusername)
    //     .then((result)=>{
    //         console.log(result)
    //         // req.session.islogged_in = false;
    //         // req.session.isVerified = false;
    //         res.redirect('/');
    //     })
    //     .catch((err)=>{
    //         res.send("Something Went Wrong")
    //     })
    // }else{
    //     res.send("Invalid Otp")
    // }  
}
module.exports = {showSignUp,saveNewusers,signin,showSignIn,emailVerification,setVerified};