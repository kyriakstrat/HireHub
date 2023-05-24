var express = require('express');
const Emploee = require("../models/emploee");
const Employer = require("../models/employer");
const { default: mongoose } = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/images/profiles/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
  });

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.png', '.jpg', '.jpeg'];
    const extension = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PNG, JPG, and JPEG files are allowed.'));
    }
  };
  const upload = multer({storage ,fileFilter });

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

router.post('/editProfile',upload.single('avatar'),async function(req,res){
    //try finding the user in Employer Collection
    let userDB;
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
    if(req.file){
        // delete the old photo
        if(userDB.avatar!='images/profiles/noPhoto.jpg'){fs.unlink(path.join('public',userDB.avatar) ,(err) => {
            if (err) {
              console.error(err);
            }
          });}

        if (req.session.employer) {
        await Employer.findOneAndUpdate({ _id: req.session.user }, { avatar: path.relative('public',req.file.path) });
        } else {
        await Emploee.findOneAndUpdate({ _id: req.session.user }, { avatar: path.relative('public',req.file.path)  });
        }
    }
    if(req.body.cv!=''){
        //replace cv with form data
    }
    res.redirect('/profile');
})
  
module.exports = router;
