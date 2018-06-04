var express = require('express');
var router = express.Router();
var LeadBsmController = require('../controllers/leadBsmController');
var lsc = new LeadBsmController();

router.get('/', lsc.getByBsm.bind(lsc));

module.exports = router;