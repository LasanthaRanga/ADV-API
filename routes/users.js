var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const checkAuth = require('../middleware/check-auth');
/* GET users listing. */



router.post("/getDistric", userController.getDistric);
router.post("/getCitys", userController.getCitys);
router.post("/signUp", userController.signUp);
router.post("/login", userController.login);
router.post("/getAllUsers", userController.getAllUsers);



module.exports = router;
