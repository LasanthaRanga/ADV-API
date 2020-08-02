var express = require('express');
var router = express.Router();
const catController = require('../controller/catController');
const checkAuth = require('../middleware/check-auth');
/* GET users listing. */



router.post("/getAll", catController.getAll);
router.post("/addCat", catController.addCat);




module.exports = router;