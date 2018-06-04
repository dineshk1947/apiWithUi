var express = require('express');
var router = express.Router();
var ServiceController = require('../controllers/serviceController');
var sc = new ServiceController();

router.get('/', sc.getAll.bind(sc));

router.get('/:id', sc.getById.bind(sc));

router.post('/', sc.create.bind(sc));

router.put('/:id', sc.update.bind(sc));

router.delete('/:id', sc.remove.bind(sc));

module.exports = router;
