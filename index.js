const express = require("express");
const app = express();
require("dotenv").config()
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const ejs = require("ejs");
const mongooese = require('mongoose');
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));

app.set("public");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname , "public")));
const sessionCofig = require("./config/session");
const db = require("./config/db.js");
app.use(sessionCofig)

const Route = require("./routes/router.js");

app.use("/",Route);

app.listen(port,() => {
    console.log(`app listned at port ${port}`);
})