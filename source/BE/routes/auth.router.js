const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const validate = require('../middleware/validate');
const authController = require('../controllers/auth.controller');
const authValidation = require('../validations/auth.validation');


router.get('/', verifyToken, authController.getUser)

router.post('/register', validate(authValidation.register), authController.postRegisterUser)

router.post('/login', validate(authValidation.login), authController.postLoginUser)

module.exports = router
