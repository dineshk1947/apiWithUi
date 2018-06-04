var express = require("express");
var router = express.Router();
var LoginController = require('../controllers/loginController');
var lc = new LoginController();

router.post('/', lc.getAuth.bind(lc));

router.post('/register', lc.create.bind(lc));

module.exports = router;