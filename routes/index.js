const express = require("express");
var router = express();
const UserModel = require("./users");
const postModel = require("./posts");
const mongoose = require("mongoose");
const passport = require("passport")
const localStrategy = require("passport-local");
passport.use(new localStrategy(UserModel.authenticate()));
mongoose.connect("mongodb+srv://miraamir189:hfLr1ShMOO4vCPDx@cluster0.jsshzzi.mongodb.net/pinterest");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/register",isAlreadyRegistered,function(req,res){
  const {username,email,fullname}= req.body;
  const userData = new UserModel({username,email,fullname});
  UserModel.register(userData,req.body.password).then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
});
router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res){
});
router.get('/profile',isLoggedIn, function(req, res, next){
 res.send("profile");
});
router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) 
  return next();
  res.redirect("/");
}
async function isAlreadyRegistered(req,res,next){
  let user=await UserModel.findOne({email:req.body.email});
  if(user){
    res.send("Already Registered");
    return;
  }
  let userWithSameUsername= await UserModel.findOne({username:req.body.username});
  if(userWithSameUsername){
    res.send("Username Already Exists");
    return;
  }
  next();
}

module.exports = router;