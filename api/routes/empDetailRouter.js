var express = require('express');
var router = express.Router();
var EmpDetailController = require('../controllers/empDetailController');
var edc = new EmpDetailController();

router.get('/', edc.getAll.bind(edc));

router.get('/:id', edc.getById.bind(edc));

router.post('/', edc.create.bind(edc));

router.put('/:id', edc.update.bind(edc));

router.delete('/:id', edc.remove.bind(edc));

module.exports = router;
