var express = require('express');
var router = express.Router();

var users = require('../controllers/userController');
var auth = require('../authentication/index');

router.get('/users/:id/list',auth, users.listOfUsers);
router.get('/users/:id/msgs',auth, users.getmsgs);
router.get('/users/:id/personalmsgs/:peerId', auth, users.getPersonalmsgs)

module.exports = router;

