const router = require('express').Router();
const express  = require('express')
const checkAdmin = require('../middlewares/checkAdmin')
router.use(express.static('public'))
const admin = require('../controllers/AdminCon')
router.get('/ProductDescription',checkAdmin,admin.getAllProduct)
router.post('/deleteproduct',checkAdmin,admin.deleteTheProduct)
router.post('/updateprod',checkAdmin,admin.updateTheProduct)
router.get('/addseller',checkAdmin,admin.showSignupSeller)
router.post('/addseller',checkAdmin,admin.saveTheSellerAdmin)
module.exports = router;
