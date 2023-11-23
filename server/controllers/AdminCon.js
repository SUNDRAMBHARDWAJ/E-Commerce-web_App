const { UpadteAdminDb, getAllProdDb, deleteFromDbAdmin, saveTheSeller } = require("../services/adminServices");

const deleteTheProduct = (req,res)=>{
    const {id} = req.query;
    console.log(id)
    deleteFromDbAdmin(id)
    .then((data)=>{
        console.log(data.deletedCount)
        res.redirect('/admin/ProductDescription');
    })
    .catch((err)=>{
        console.log(err)
        res.send("Error occurred")
    })
}
const updateTheProduct = (req,res)=>{
    const {id} = req.query;
    const x = req.body;
    UpadteAdminDb(id,x)
    .then((data)=>{
        res.redirect('/admin/ProductDescription')
    })
    .catch((err)=>{
        console.log("Error")
        res.send("Something went wrong")
    })
}
const getAllProduct = (req,res)=>{
    getAllProdDb()
    .then((pdata)=>{
        res.render("ProductManagement",{arr:pdata,name:req.session.username})
    })
    .catch((err)=>{
        console.log("Error");
        res.send("Something Went Wrong")
    })
}

const showSignupSeller = (req,res)=>{
    res.render('SignupSeller')
}

const saveTheSellerAdmin = (req,res)=>{
    const x = req.body;
    console.log(x);
    saveTheSeller(x);
    res.render("smessage")
}

module.exports = {saveTheSellerAdmin,showSignupSeller,getAllProduct,updateTheProduct,deleteTheProduct}