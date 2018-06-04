var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');
var cc = new categoryController();

router.get('/', cc.getAll.bind(cc));

router.get('/:id', cc.getById.bind(cc));

router.post('/', cc.create.bind(cc));

router.put('/:id', cc.update.bind(cc));

router.delete('/:id', cc.remove.bind(cc));

module.exports = router;
