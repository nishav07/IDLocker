const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const sessionCofig = session(
  {
  name:"sid",
  secret:process.env.SECRET_KEY,     
  resave: false,                   
  saveUninitialized: false,  
  
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URL,
    collection:"sessions"
  }),

  cookie: { 
    httpOnly:true,
    maxAge: 1000 * 60 * 60
   },
  })



  module.exports = sessionCofig;
  