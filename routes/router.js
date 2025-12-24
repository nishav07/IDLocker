const express = require('express');
const router = express.Router();
const callBack = require("../controllers/user");


router.get("/",callBack.index);


module.exports = router;