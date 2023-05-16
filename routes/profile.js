var express = require('express');
const Emploee = require("../models/emploee");
const Employer = require("../models/employer");
const { default: mongoose } = require('mongoose');

var router = express.Router();


router.get('/',async function(req,res){
    if (!req.session.user)res.redirect('/');
    let edit = true;
    // console.log(user);

    let userDB;
    //try finding the user in Employer Collection
    userDB = await Employer.findById(mongoose.Types.ObjectId(req.session.user));
    //if not there find it in Emploee collection.
    if(!userDB)userDB = await Emploee.findById(mongoose.Types.ObjectId(req.session.user));
    

    console.log(userDB);
    res.render('profile',{user:userDB,editProfile:edit});
});


router.get('/:id',async function(req,res){
    if (!req.session.user)res.redirect('/');
    let edit = false;
    // console.log(user)
    let userDB;
    //try finding the user in Employer Collection
    userDB = await Employer.findById(mongoose.Types.ObjectId(req.params.id));
    //if not there find it in Emploee collection.
    if(!userDB)userDB = await Emploee.findById(mongoose.Types.ObjectId(req.params.id));
    
    console.log(userDB);
    res.render('profile',{user:userDB,editProfile:edit});
});

  
module.exports = router;
