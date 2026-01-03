const express = require('express');
const router = express.Router();
const callBack = require("../controllers/user");
const callBack2 = require("../controllers/auth");
const middleware = require("../middlewares/auth.js");
const isLoggedIn = middleware.isLoggedIn;


router.get("/",callBack.index);
router.get("/auth",callBack2.auth)
router.post("/signup",callBack2.signup);
router.post("/login",callBack2.login);
router.get("/dashboard",isLoggedIn,callBack.dashboard);
router.get("/components/:page",isLoggedIn,callBack.components)
router.post("/logout",isLoggedIn,callBack2.logout)


module.exports = router;