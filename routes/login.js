const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', loginController.getLoginPage);
router.post('/sign-in', loginController.signIn);
router.post('/reg_employer', loginController.registerEmployer);
router.post('/reg_emploee', loginController.registerEmploee);

module.exports = router;