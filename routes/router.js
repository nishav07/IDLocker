const express = require('express');
const router = express.Router();
const callBack = require("../controllers/user");


router.get("/",callBack.index);
router.get("/auth",callBack.auth)
router.post("/signup",callBack.signup);


module.exports = router;