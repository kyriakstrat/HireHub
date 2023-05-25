// Import required modules
const path = require('path');
const fs = require('fs');
const Application = require('../models/application');
const Emploee = require('../models/emploee');
const Employer = require('../models/employer');
const mongoose = require('mongoose');

// Controller function for handling the root route
exports.getIndex = async function (req, res, next) {
  try {
    if (req.session.user) {
      if (req.session.employer) {
        const applications = await Application.find({ author: req.session.user }).populate('applicants');
        res.render('index', {
          employer: true,
          appsAny: applications.length,
          apps: applications,
        });
      } else {
        const applications = await Application.find({ 'applicants.userId': { $ne: req.session.user } }).populate('author');
        const myApplications = await Application.find({ 'applicants.userId': req.session.user }).populate('author');
        appStatus = [];
        for (app of myApplications) {
          for (applicant of app.applicants) {
            if (applicant.userId == req.session.user) {
              appStatus.push(applicant.status);
              break;
            }
          }
        }

        let tmp = JSON.parse(JSON.stringify(myApplications));
        let i = 0;
        for (app of tmp) {
          app.stat = appStatus[i];
          i++;
        }

        res.render('index', {
          employer: false,
          appsAny: applications.length,
          apps: applications,
          myAppsAny: myApplications.length,
          myApps: tmp,
        });
      }
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error retrieving index:', error);
    next(error);
  }
};

// Controller function for logging out
exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};

// Controller function for creating an application
exports.createApplication = async function (req, res) {
  try {
    let file;
    if (req.file) {
      file = path.relative('public', req.file.path);
    } else {
      file = 'images/applications/noPhoto.jpg';
    }

    const app = await new Application({
      author: req.session.user,
      typeOfWork: req.body.jobType,
      region: req.body.region,
      field: req.body.proffesion,
      description: req.body.jobDescription,
      companyName: req.body.companyName,
      interview: req.body.interview,
      photo: file,
    }).save();

    res.redirect('/');
  } catch (error) {
    console.error('Error creating application:', error);
    res.redirect('/');
  }
};

// Controller function for deleting an application
exports.deleteApplication = async function (req, res) {
  try {
    const app = await Application.findById(mongoose.Types.ObjectId(req.params._id));
    if (app.photo !== 'images/applications/noPhoto.jpg') {
      fs.unlinkSync(path.join('public', app.photo));
    }
    await Application.findByIdAndDelete(req.params._id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting application:', error);
    res.redirect('/');
  }
};

// Controller function for applying to an application
exports.applyToApplication = async function (req, res) {
  try {
    const app = await Application.findById(req.params.id);
    const user = await Emploee.findById(req.session.user);
    app.applicants.push({ userId: req.session.user, status: 0, name: user.email });
    await app.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error applying to application:', error);
    res.redirect('/');
  }
};

// Controller function for canceling application
exports.cancelApplication = async function (req, res) {
  try {
    const app = await Application.findById(req.params.id);
    let i = 0;
    for (applicant of app.applicants) {
      if (applicant.userId == req.session.user) {
        app.applicants.splice(i, 1);
        break;
      }
      i++;
    }
    app.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error canceling application:', error);
    res.redirect('/');
  }
};

// Controller function for accepting an applicant
exports.acceptApplicant = async function (req, res) {
  try {
    const appId = mongoose.Types.ObjectId(req.params.app);
    const app = await Application.findOne({ 'applicants._id': appId });
    const applicants = app.applicants;
    for (item of applicants) {
      if (item.userId == req.params.id) {
        item.status = 1;
        res.redirect('/');
        app.save();
        break;
      }
    }
  } catch (error) {
    console.error('Error accepting applicant:', error);
    res.redirect('/');
  }
};

// Controller function for rejecting an applicant
exports.rejectApplicant = async function (req, res) {
  try {
    const appId = mongoose.Types.ObjectId(req.params.app);
    const app = await Application.findOne({ 'applicants._id': appId });
    const applicants = app.applicants;
    for (item of applicants) {
      if (item.userId == req.params.id) {
        item.status = 2;
        res.redirect('/');
        app.save();
        break;
      }
    }
  } catch (error) {
    console.error('Error rejecting applicant:', error);
    res.redirect('/');
  }
};

// Controller function for handling the filter bar
exports.filterApplications = async function (req, res) {
  try {
    const city = req.body.region;
    const jobType = req.body.jobType;
    const field = req.body.proffesion;

    let query = {
      'applicants.userId': { $ne: req.session.user },
    };
    if (city != 'all') {
      query.region = city;
    }
    if (jobType != 'all') {
      query.typeOfWork = jobType;
    }
    if (field != 'all') {
      query.field = field;
    }

    const applications = await Application.find(query).populate('author');
    const myApplications = await Application.find({ 'applicants.userId': req.session.user }).populate('author');
    appStatus = [];
    for (app of myApplications) {
      for (applicant of app.applicants) {
        if (applicant.userId == req.session.user) {
          appStatus.push(applicant.status);
          break;
        }
      }
    }

    let tmp = JSON.parse(JSON.stringify(myApplications));
    let i = 0;
    for (app of tmp) {
      app.stat = appStatus[i];
      i++;
    }

    res.render('index', {
      employer: false,
      appsAny: applications.length,
      apps: applications,
      myAppsAny: myApplications.length,
      myApps: tmp,
    });
  } catch (error) {
    console.error('Error filtering applications:', error);
    res.redirect('/');
  }
};