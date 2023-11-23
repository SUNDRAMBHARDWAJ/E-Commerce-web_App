const router = require('express').Router();
const { emailVerification,setVerified} = require('../controllers/miselleneousCon');
router.post('/',emailVerification)
router.post('/check',setVerified)
module.exports = router;