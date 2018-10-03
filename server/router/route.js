var express = require('express');
var router = express.Router();
var app = express();
var auth = require('../router/authRouter');
var users = require('../controllers/userController');
var auth = require('../router/authRouter');

const { check, validationResult } = require('express-validator/check');
// var usermod = require('../models/users')
// var db = new usermod();
//var user=require('../controller/userController')
router.use('/auth',auth);

router.post('/login', function(req,res,next){

    email = req.body.email;
    phoneNumber = req.body.phoneNumber;

    check('email').isEmail(),
    check('password').isLength({ min: 2 })

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    else {
        next();
    }
}, users.login)
    


router.post('/register', function(req,res,next) {

    firstName = req.body.firstName;
    lastName = req.body.lastName;
    userName = req.body.userName;
    email = req.body.email;
    phoneNumber = req.body.phoneNumber;

    check('firstName').isAlpha(),
    check('lastName').isAlpha(),
    check('email').isEmail(),
    check('userName').isAlpha(),
    check('password').isLength({ min: 2 }),
    check('phoneNumber').isNumeric({ min: 10, max: 10 })

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    else {
        next();
    }
}, users.registration)

app.use('/', router);
module.exports = router;