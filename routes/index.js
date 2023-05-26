const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

const upload = multer({ storage, fileFilter });

const indexController = require('../controllers/indexController');

// GET users listing
router.get('/', indexController.getIndex);

router.get('/log_out', indexController.logout);

router.post('/create_application', upload.single('appPhoto'), indexController.createApplication);

router.get('/delete_app/:_id', indexController.deleteApplication);

router.get('/apply/:id', indexController.applyToApplication);

router.get('/cancel/:id', indexController.cancelApplication);

router.get('/accept/:id/:app', indexController.acceptApplicant);

router.get('/reject/:id/:app', indexController.rejectApplicant);

router.post('/filterBar', indexController.filterApplications);

module.exports = router;