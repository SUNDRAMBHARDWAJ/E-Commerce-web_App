const router = require('express').Router()
const checkAdmin = require('../middlewares/checkAdmin')
const checkAuth = require('../middlewares/checkAuth');
const SellerAuth = require('../middlewares/SellerAuth')
const {findTheProduct, addToCart,
    fetchMyCart,incCart,decCart, 
    deleteFromCart, findMyOrders, 
    placeOrder, showAddressPage, 
    showChangePass, showSeller, 
    showAdmin, showForget, 
    handleForget, showForgetpass, 
    changepassword, forgotchangepassword,
     fetchDataInLimit5, cartWithInfo,
      payment, handlePayment, finalPlace,
       showSuccess, mytest, mytest2} 
       = require('../controllers/UserCon')
const checkRequest = require('../middlewares/forgotRequest');
const verifyToken = require('../middlewares/VerifyToken');
router.get('/Admin',checkAdmin,showAdmin)
router.get('/home',verifyToken,findTheProduct)
router.post('/addtocart',verifyToken,addToCart)
router.get('/mycart',verifyToken,fetchMyCart)
router.post('/inccart',incCart)
router.post('/deccart',decCart)
router.post('/dcart',deleteFromCart)
router.get('/myorders',verifyToken,findMyOrders)
router.post('/order',checkAuth,placeOrder)
router.get('/changePassword',checkAuth,showChangePass)
router.get('/Seller',SellerAuth,showSeller)
router.get('/forgotpass',showForget)
router.post('/forgetpass',handleForget)
router.get('/forgotchangepassword',showForgetpass)
router.get('/order',checkAuth,showAddressPage)
router.post('/changepassword',verifyToken,changepassword)
router.post('/forgotchangepassword',checkRequest,forgotchangepassword)
router.get('/sendata',fetchDataInLimit5)
router.get('/mycartinfo',checkAuth,cartWithInfo);
router.get('/payment',verifyToken,handlePayment);
router.get('/paymentonprocess',verifyToken,payment)
router.post('/orderplaced',verifyToken,finalPlace)
router.get('/success',checkAuth,showSuccess)
router.get('/testkaro',mytest);
router.get('/testpayment',mytest2);

module.exports = router;