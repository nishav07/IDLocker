const express = require('express');
const router = express.Router();
const callBack = require("../controllers/user");
const callBack2 = require("../controllers/auth");


router.get("/",callBack.index);
router.get("/auth",callBack2.auth)
router.post("/signup",callBack2.signup);
router.post("/login",callBack2.login);


module.exports = router;