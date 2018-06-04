var express = require('express');
var router = express.Router();
var ProcessController = require('../controllers/processController');
var pc = new ProcessController();

router.get('/', pc.getAll.bind(pc));

module.exports = router;
