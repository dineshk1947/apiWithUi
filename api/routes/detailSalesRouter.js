var express = require('express');
var router = express.Router();
var DetailSalesController = require('../controllers/detailSalesController');
var dsc = new DetailSalesController();

router.get('/', dsc.getAll.bind(dsc));

router.get('/:id', dsc.getById.bind(dsc));

router.post('/', dsc.create.bind(dsc));

router.put('/:id', dsc.update.bind(dsc));

router.delete('/:id', dsc.remove.bind(dsc));

module.exports = router;
