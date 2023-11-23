const router = require('express').Router();
const express  = require('express')
const Addauth = require('../middlewares/Addauth')
const SellerAuth = require('../middlewares/SellerAuth')
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const uploadcsv = multer({dest:'uploadscsv'})
const { addtheProduct, getMyProduts, recieveTheOrder, updateTheproduct, deleteMyProduct, HandleCsv } = require('../controllers/SellerCon');
router.use(express.static("public"));
router.post('/addproduct',addtheProduct)
router.post('/deleteproduct',deleteMyProduct)
router.get('/myproducts',getMyProduts)
router.get('/recieve_orders',recieveTheOrder)
router.post('/updateprod',updateTheproduct)
router.post('/getcsv',SellerAuth,uploadcsv.single('csvfile'),HandleCsv)
module.exports = router;