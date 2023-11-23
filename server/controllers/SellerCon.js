const savetheproduct = require('../services/Authentication');
const fs = require("fs");
const csvParser = require("csv-parser");
const { updateTheProductDb, recieveTheOrderDb, getMyProductDb, deleteMyProductDb, savetheproductdb } = require('../services/sellerServices');
const addtheProduct =(req,res)=>{
    console.log(req.body)
    x = req.body;
    x.sellerId = 1555;
    savetheproductdb(x)
    .then(()=>{
        res.json(true)
    })
    .catch(()=>{
        res.json(false)
    })
}
const updateTheproduct = (req,res)=>{
    const {id} = req.query;
    const x = req.body;
    updateTheProductDb(id,x)
    .then((data)=>{
        console.log(data)
        if(data[0] === 1){
            res.status(200).json({updated:true})
        }else{
            res.status(400).json({updated:false})
        }
    })
    .catch((err)=>{
        console.log("Error")
        res.send("Something went wrong")
    })
}

const recieveTheOrder = (req,res)=>{
   const id  = 1555;
    recieveTheOrderDb(id)
    .then((data)=>{
        console.log(data)
        res.status(200).json({arr:data})
    })
}
const getMyProduts = (req,res)=>{
    const sid = 1555;
    getMyProductDb(sid)
    .then((data)=>{
        console.log(data);
        res.json(data)
    })
    .catch((err)=>{
        console.log("Error Occured")
    })
}

const deleteMyProduct = (req,res)=>{
    const {id} = req.query;
    console.log(id)
    deleteMyProductDb(id)
    .then((data)=>{
        console.log(data)
        if(data.rowsAffected[0]){
            res.json(true);
        }else{
            res.json(false)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.json(false)
    })
}
const HandleCsv = (req,res)=>{
    var result = []
    const x = req.file.filename;
    console.log(x)
    fs.createReadStream("./uploadscsv/"+x)
  .pipe(csvParser())
  .on("data", (data) => {
    data.sellerId = req.session.SellerId;
    result.push(data);
  })
  .on("end", () => {
    console.log(result);
    result.forEach((element)=>{
        savetheproductdb(element)
        .then(()=>{
            console.log("Success");
        }).catch(()=>{
            res.send("Error")
        })
    })
  }).on("end",()=>{
    res.redirect('/seller/myproducts')
    })
}


module.exports = {addtheProduct,updateTheproduct,recieveTheOrder,getMyProduts,deleteMyProduct,HandleCsv};