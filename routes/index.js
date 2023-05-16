var express = require('express');
var router = express.Router();

const Application = require("../models/application");
const Emploee = require("../models/emploee");
const Employer = require("../models/employer");
const { default: mongoose } = require('mongoose');
// const ApplicationRequest = require("../models/applicationRequest");


/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(req.session.user){
    if(req.session.employer){
      const applications = await Application.find({author:req.session.user}).populate('applicants');
      console.log(applications);
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
      console.log(tmp);
      // console.log(myApplications);
      // console.log(appStatus);
      
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

router.post('/create_application',async (req,res)=>{
  // creates application with id of the employer and the rest data from the form.
  const app = await new Application({
    author:req.session.user,
    typeOfWork:req.body.jobType,
    region:req.body.region,
    field:req.body.proffesion,
    description:req.body.jobDescription,
    companyName:req.body.companyName
  }).save();

  res.redirect("/");
});

router.get("/delete_app/:_id",async function(req,res){
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
    console.log(applicant);
    if(applicant.userId==req.session.user){
      app.applicants.splice(i,1);
      console.log(app.applicants);
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


module.exports = router;
