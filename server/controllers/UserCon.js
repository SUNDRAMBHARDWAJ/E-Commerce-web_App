const res = require('express/lib/response');
const userServices = require('../services/userServices')
const findTheProduct = (req,res)=>{
        userServices.findProductFromDb()
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            console.log(err);
        })
}
const addToCart = (req,res)=>{
    const userId = res.id
    const id = req.body.id;
    userServices.checkProductQuantity(id)
    .then((data)=>{
        console.log("left " + data)
        if(Number(data) > 0){
            userServices.addCartToDb(id,userId)
            .then((data)=>{
                console.log(data)
                if(data.rowsAffected[0] == 0){
                    userServices.saveTocart(userId,id,1);
                    console.log("saved");
                }
                res.send(true)
            })
            .catch((err)=>{
                console.log("Errors",err)
                res.send("errors")
            })
        }else{
            console.log(false)
            res.send(false);
        }
    })
    
}


const fetchMyCart =(req,res)=>{
    const id = res.id;
    console.log(id,"ididididid")
    userServices.fetchMyCartDb(id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log('error')
        res.send("Error Fetching Please Try Again later")
    })
}

const incCart = (req,res)=>{
    const {id} = req.query;
    console.log(id)
    userServices.incCartDb(id)
    .then((data)=>{
        console.log(data)
        if(data.rowsAffected[0] === 0){
            res.json(false)
        }else{
            res.json(true)
        }
    })
    .catch((err)=>{
        console.log('error',err)
        res.send('error')
    })
}

const decCart = (req,res)=>{
    const {id} = req.query;
    console.log(id)
    userServices.decCartDb(id)
    .then((data)=>{
        console.log(data)
        if(data.rowsAffected[0] === 0){
            res.json(false)
        }else{
            res.json(true)
        }
    })
    .catch((err)=>{
        console.log('error')
        res.send('error')
    })
}

const deleteFromCart = (req,res)=>{
    const {id} = req.query;
    userServices.deleteFromCartdb(id)
    .then((data)=>{
        if(data.rowsAffected[0] === 0){
            res.json(false)
        }else{
            res.json(true)
        }
    })
    .catch((err)=>{
        res.send('error');
    })
}
const findMyOrders = (req,res)=>{
    const id = res.id;
    userServices.findMyOrdersDb(id)
    .then((data)=>{
        res.json(data)
    })
    
}

const placeOrder = (req,res)=>{
    const ad = req.body;
    req.session.address = ad;
    console.log(ad);
    const userId = req.session.dbuid;
    var total = 0;
    userServices.orderPlaceValidation(userId)
    .then((data)=>{
        let allWell = true;
        for(let i = 0 ; i < data.length ; i++){
            if(data[i].cq > data[i].pq){
                allWell = false;
                break;
            }else{
                total += data[i].cq * data[i].price;
            }
        }
        if(allWell){
            req.session.cartTotal = total;
            res.redirect('/users/payment')
        }else{
            res.render("ProductMismatch");
        }
    })
}

const showAddressPage = (req,res)=>{
    res.render('Address')
}

const showChangePass = (req,res)=>{
    res.render('ChangePassword')
}

const showSeller = (req,res)=>{
    res.render("Seller",{name:req.session.username})
}

const showAdmin = (req,res)=>{
    const name = req.session.username
    res.render("Admin.ejs",{name:name})
}

const showForget = (req,res)=>{
    res.render('Forget')
}

const handleForget = (req,res)=>{
    const x = req.body;
    req.session.forgotEmail = x.email;
    req.session.feRequest = true;
    forgotEmail(req.session.forgotEmail,(err,data)=>{
        if(err){
            res.send("Something went wrong")
        }else{
            res.render('EmailSent')
        }
    })
}
const showForgetpass = (req,res)=>{
    res.render('forgetpass')
}

const changepassword =(req,res)=>{
   const id = res.id;
    let {pass,cpass} = req.body;
    console.log(id,pass,cpass)
    if(pass === cpass){
        userServices.updatePassdb(id,cpass)
        .then((result)=>{
            if(result === 1)
            console.log("changed SuccessFully")
            res.clearCookie('JWT')
            res.status(200).json({changed:true})
        })
        .catch((err)=>{
            res.status(400).json({changed:false})
        })
    }
}

const forgotchangepassword = (req,res)=>{
    let {pass,cpass} = req.body;
    const username = req.session.forgotEmail
    if(pass === cpass){
        userServices.updatePassdb(username,cpass)
        .then((result)=>{
            if(data.rowsAffected[0] === 1){
                console.log("changed SuccessFully")
                req.session.destroy();
                res.redirect('/signin')
            }else{
                req.session.destroy();
                res.send("Something Went Wrong")
            }
        })
        .catch((err)=>{
            res.send('Something Went Wrong')
        })
    }
}

const fetchDataInLimit5 = (req,res)=>{
    var {id} = req.query;
    let c = Number(id);
    userServices.fetchDataInLimit5Db(c)
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        console.log(err)
    })
}
const cartWithInfo = (req,res)=>{
    const userId = req.session.dbuid;
    userServices.fetchMyCartDb(userId)
    .then((data)=>{
        res.render('cart',{name:req.session.username,arr:data,info:true})
    })
    .catch((err)=>{
        console.log('error')
        res.send("Error Fetching Please Try Again later")
    })
}
const Razorpay = require('razorpay');
var instance = new Razorpay({ 
    key_id: 'rzp_test_rBSuIlLakAJ94a', 
    key_secret: 'rk8o2hHBWWQHhSWbjB1ATbRL' })

const handlePayment = (req,res)=>{
    console.log(res.id,"Here")
    userServices.GetOrderTotal(res.id)
    .then((data)=>{
        if(data > 0){
            res.status(200).json({Cart_Total:data})
        }else{
            res.status(400).send('Bad Request')
        }
    })
}
const payment = (req,res)=>{
    //console.log("hello")
    //console.log(req.session.cartTotal)
    const id = res.id
    userServices.GetOrderTotal(id)
    .then((data)=>{
        var options = {
            amount: data*100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
          instance.orders.create(options, function(err, order) {
            console.log("this is orderid",order.id);
            res.status(200).json({orderId:order.id})
          });
    })
}

const finalPlace = (req,res)=>{
    const userId = res.id;
    const ad = JSON.parse(req.body.address);
    console.log(userId + " ")
    console.log(ad)
    userServices.fetchMyCartDb(userId)
            .then((data)=>{
                for(let i = 0 ; i < data.length; i++){
                    console.log("lalala ",data[i]);
                    userServices.saveToOrdersAndReduceProductQuantity(data[i],ad,data[i].productId,data[i].quantity)
                }
            }).catch((err)=>{
                res.status(400).json({payment:false})
            })
            userServices.deleteCart(userId)
            .then((data)=>{
                console.log(data)
        }).catch((err)=>{
            res.status(400).json({payment:false})
        })
        res.status(200).json({payment:true})
}

const mytest = (req,res)=>{

    res.render('testforD');
}
const mytest2 = (req,res)=>{
    var options = {
        amount: 150000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        console.log("this is orderid",order.id);
        //res.redirect('/users/orderplaced')
        res.send({orderId:order.id,});
      });
}

const showSuccess = (req,res)=>{
    res.render('message')
}
module.exports = {findTheProduct,addToCart,fetchMyCart,incCart,decCart,
deleteFromCart,findMyOrders,placeOrder,showAddressPage,showChangePass,
showSeller,showAdmin,showForget,handleForget,showForgetpass,changepassword,
forgotchangepassword,fetchDataInLimit5,cartWithInfo,handleForget,payment,handlePayment,finalPlace,showSuccess,mytest,mytest2};












