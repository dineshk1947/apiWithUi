var express = require('express');
var router = express.Router();
var testController = require('../controllers/testController');
var tc = new testController();

router.get('/', tc.getAll.bind(tc));

router.get('/:id', tc.getById.bind(tc));

router.post('/', tc.create.bind(tc));

router.put('/:id', tc.update.bind(tc));

router.delete('/:id', tc.remove.bind(tc));

module.exports = router;
