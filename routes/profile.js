const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const profileController = require('../controllers/profileController');
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

const upload = multer({ storage, fileFilter });

router.get('/', profileController.getProfile);
router.get('/:id', profileController.getProfileById);
router.post('/editProfile', upload.single('avatar'), profileController.editProfile);

module.exports = router;