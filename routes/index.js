var express = require('express');
var router = express.Router();

const Application = require("../models/application");
const Emploee = require("../models/emploee");
const Employer = require("../models/employer");
const { default: mongoose } = require('mongoose');
const { registerHelper } = require('hbs');
// const ApplicationRequest = require("../models/applicationRequest");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/images/applications/',
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

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(req.session.user){
    if(req.session.employer){
      const applications = await Application.find({author:req.session.user}).populate('applicants');
      res.render('index',{
        employer:true,
        appsAny:applications.length,
        apps:applications,
      });
    }else{
      const applications = await Application.find({"applicants.userId":{$ne:req.session.user}}).populate('author');
      const myApplications = await Application.find({"applicants.userId":req.session.user}).populate("author" );
      // appStatus = JSON.parse(JSON.stringify(myApplications));
      appStatus=[];
      for(app of myApplications){
        for(applicant of app.applicants){
          if(applicant.userId == req.session.user){
            appStatus.push(applicant.status);
            break;
          }
        }
      }

      let tmp = JSON.parse(JSON.stringify(myApplications));
      let i=0;
      for(app of tmp){
        app.stat = appStatus[i];
        i++;
      }
      // console.log(myApplications);
      // console.log(appStatus);
      console.log(applications.length);
      res.render('index',{
        employer:false,
        appsAny:applications.length,
        apps:applications,
        myAppsAny:myApplications.length,
        myApps:tmp,
      });
      // console.log(myApps);
    }
  }else{
    res.redirect('/login');
  }

});

router.get('/log_out',function(req,res){
  req.session.destroy();
  res.redirect('/');
});

router.post('/create_application',upload.single('appPhoto'),async (req,res)=>{
  // creates application with id of the employer and the rest data from the form.
  let file; 
  if(req.file){
    file = path.relative('public',req.file.path) ;
  }else{file = 'images/applications/noPhoto.jpg'}
  const app = await new Application({
    author:req.session.user,
    typeOfWork:req.body.jobType,
    region:req.body.region,
    field:req.body.proffesion,
    description:req.body.jobDescription,
    companyName:req.body.companyName,
    photo:file,
  }).save();
 
  res.redirect("/");
});

router.get("/delete_app/:_id",async function(req,res){
  app = await Application.findById(mongoose.Types.ObjectId(req.params._id));
  console.log(app);
  if(app.photo!='images/applications/noPhoto.jpg'){fs.unlink(path.join('public',app.photo) ,(err) => {
    if (err) {
      console.error(err);
    }
  });}

  await Application.findByIdAndDelete(req.params._id);
  //{TODO} must delete application Requests associated to the app as well. 
  res.redirect('/');
});

router.get('/apply/:id',async function(req,res){
  const app = await Application.findById(req.params.id);
  const user = await Emploee.findById(req.session.user);
  //status: 0->pending, 1->rejected,2->accepted
  app.applicants.push({userId:req.session.user,status:0,name:user.email});
  await app.save();
  res.redirect('/');
});
router.get('/cancel/:id',async function(req,res){
  const app = await Application.findById(req.params.id);
  let i=0;
  for(applicant of app.applicants){
    if(applicant.userId==req.session.user){
      app.applicants.splice(i,1);
      break;
    }
    i++;
  }
  app.save();
  res.redirect('/');
});
router.get('/accept/:id/:app',async function(req,res){
  const appId = mongoose.Types.ObjectId(req.params.app);
  //returns object with the array of applicants
  const app = await Application.findOne({"applicants._id":appId});
  const applicants = app.applicants;
  //find the applicant with id=req.params.id 
  for(item of applicants){
    // console.log(item.userId+' '+req.params.id);
    if(item.userId==req.params.id){
      item.status = 1;
      res.redirect('/');
      app.save();
      break;
    }
  }
});
router.get('/reject/:id/:app',async function(req,res){
  const appId = mongoose.Types.ObjectId(req.params.app);
  //returns object with the array of applicants
  const app = await Application.findOne({"applicants._id":appId});
  const applicants = app.applicants;
  //find the applicant with id=req.params.id 
  for(item of applicants){
    // console.log(item.userId+' '+req.params.id);
    if(item.userId==req.params.id){
      item.status = 2;
      res.redirect('/');
      app.save();
      break;
    }
  }
});

router.post('/filterBar',async function(req,res){
  const city = req.body.region;
  const jobType = req.body.jobType;
  const field = req.body.proffesion;

  let query = {
    "applicants.userId": { $ne: req.session.user },
  };
  if(city!='all'){query.region=city;}
  if(jobType!='all'){query.typeOfWork=jobType;}
  if(field!='all'){query.field=field;}

  const applications = await Application.find(query).populate('author');
  const myApplications = await Application.find({"applicants.userId":req.session.user}).populate("author" );
  // appStatus = JSON.parse(JSON.stringify(myApplications));
  appStatus=[];
  for(app of myApplications){
    for(applicant of app.applicants){
      if(applicant.userId == req.session.user){
        appStatus.push(applicant.status);
        break;
      }
    }
  }

  let tmp = JSON.parse(JSON.stringify(myApplications));
  let i=0;
  for(app of tmp){
    app.stat = appStatus[i];
    i++;
  }
  // console.log(myApplications);
  // console.log(appStatus);
  
  res.render('index',{
    employer:false,
    appsAny:applications.length,
    apps:applications,
    myAppsAny:myApplications.length,
    myApps:tmp,
  });
});

module.exports = router;
