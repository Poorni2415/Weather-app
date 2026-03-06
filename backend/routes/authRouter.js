const { login, signup } = require('../controllers/authController');
const { signupvalidation, loginvalidation } = require('../middlewares/authValidation');

const router = require('express').Router()
router.post('/login',loginvalidation,login)
router.post('/signup',signupvalidation,signup);


module.exports = router;
