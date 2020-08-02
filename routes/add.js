var express = require('express');
var router = express.Router();
const addController = require('../controller/addController');
const checkAuth = require('../middleware/check-auth');
/* GET users listing. */



router.post("/getAll", addController.getAllUsers);
router.post("/newPost", addController.newPost);
router.post("/getPending", addController.getPending);
router.post("/getAddData", addController.getAddData);





module.exports = router;