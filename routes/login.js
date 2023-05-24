var express = require('express');
var router = express.Router();

const Emploee = require("../models/emploee");
const Employer = require("../models/employer");


/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.session.user)res.redirect('/');
  console.log('login session:',req.session.user);
  res.render('login',{name:'HireHub | Login'});
});

router.post('/sign-in',async function(req,res){
  const employer = await Employer.find({email:req.body.uname,password:req.body.psw});
  const emploee = await Emploee.find({email:req.body.uname,password:req.body.psw});
  if(employer.length){
    // req.session.userid = employer._id;
    req.session.user = employer[0]._id;
    req.session.employer = true;
  }else if(emploee.length){
    req.session.user = emploee[0]._id;
    req.session.employer = false;
  }
  res.redirect('/');
});

router.post('/reg_employer',async function(req,res){
  const userCount = await Employer.countDocuments({email:req.body.uname});
  console.log(userCount);
  if(userCount<1){
    console.log('adding user to dB');
    const employer = await new Employer({email:req.body.uname,password:req.body.psw}).save();
    req.session.user = employer._id;
    req.session.employer = true;
  }else{
    console.log('user alread registered');
  }
  res.redirect('/');
});

router.post('/reg_emploee',async function(req,res){
  const userCount = await Emploee.countDocuments({email:req.body.uname});
  console.log(userCount);
  if(userCount<1){
    console.log('adding user to dB');
    const emploee = await new Emploee({email:req.body.uname,password:req.body.psw}).save();
    req.session.user = emploee._id;
    req.session.employer = false;
  }else{
    console.log('user alread registered');
  }
  res.redirect('/');
});



module.exports = router;
