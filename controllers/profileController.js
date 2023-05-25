const Emploee = require("../models/emploee");
const Employer = require("../models/employer");
const { default: mongoose } = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


exports.getProfile = async function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
  }
  let edit = true;
  let userDB;
  
  userDB = await Employer.findById(mongoose.Types.ObjectId(req.session.user));
  if (!userDB) {
    userDB = await Emploee.findById(mongoose.Types.ObjectId(req.session.user));
  }

  console.log(userDB);
  res.render('profile', { user: userDB, editProfile: edit });
};

exports.getProfileById = async function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
  }
  let edit = false;
  let userDB;

  userDB = await Employer.findById(mongoose.Types.ObjectId(req.params.id));
  if (!userDB) {
    userDB = await Emploee.findById(mongoose.Types.ObjectId(req.params.id));
  }

  console.log(userDB);
  res.render('profile', { user: userDB, editProfile: edit });
};

exports.editProfile = async function(req, res) {
  let userDB;
  if (req.session.employer) {
    userDB = await Employer.findById(mongoose.Types.ObjectId(req.session.user));
  } else {
    userDB = await Emploee.findById(mongoose.Types.ObjectId(req.session.user));
  }

  if (req.body.name !== '') {
    if (req.session.employer) {
      await Employer.findOneAndUpdate({ _id: req.session.user }, { name: req.body.name });
    } else {
      await Emploee.findOneAndUpdate({ _id: req.session.user }, { name: req.body.name });
    }
  }

  if (req.body.bio !== '') {
    if (req.session.employer) {
      await Employer.findOneAndUpdate({ _id: req.session.user }, { bio: req.body.bio });
    } else {
      await Emploee.findOneAndUpdate({ _id: req.session.user }, { bio: req.body.bio });
    }
  }

  if (req.file) {
    if (userDB.avatar !== 'images/profiles/noPhoto.jpg') {
      fs.unlink(path.join('public', userDB.avatar), (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    if (req.session.employer) {
      await Employer.findOneAndUpdate({ _id: req.session.user }, { avatar: path.relative('public', req.file.path) });
    } else {
      await Emploee.findOneAndUpdate({ _id: req.session.user }, { avatar: path.relative('public', req.file.path) });
    }
  }

  if (req.body.cv !== '') {
    // replace cv with form data
  }

  res.redirect('/profile');
};