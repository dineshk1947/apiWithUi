var express = require('express');
var router = express.Router();
var CommonMailController = require('../controllers/commonMailController');
var cmc = new CommonMailController();

router.post('/', cmc.register.bind(cmc));


module.exports = router;
