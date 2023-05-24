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

router.post('/editProfile',async function(req,res){
    console.log('profile edit');
    let userDB;
    //try finding the user in Employer Collection
    if(req.session.employer){userDB = await Employer.findById(mongoose.Types.ObjectId(req.session.user));}
    else{userDB = await Emploee.findById(mongoose.Types.ObjectId(req.session.user));}

    if(req.body.name!=''){
        // replace username with name
        if(req.session.employer){await Employer.findOneAndUpdate({_id : req.session.user}, {name:req.body.name});}
        else{await Emploee.findOneAndUpdate({_id : req.session.user}, {name:req.body.name});}
    }
    if(req.body.bio!=''){
        //replace bio with form data
        if(req.session.employer){await Employer.findOneAndUpdate({_id : req.session.user}, {bio:req.body.bio});}
        else{await Emploee.findOneAndUpdate({_id : req.session.user}, {bio:req.body.bio});}
    }
    if(req.body.avatar!=''){
        //replace profile photo with form data
    }
    if(req.body.cv!=''){
        //replace cv with form data
    }
    res.redirect('/profile');
})
  
module.exports = router;
