const router = require('express').Router();
const { signin, showSignIn } = require('../controllers/miselleneousCon');
router.get('/',showSignIn)
router.post("/",signin);
module.exports = router;
