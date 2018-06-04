var express = require('express');
var router = express.Router();
var leadController = require('../controllers/leadController');
var lc = new leadController();

router.get('/:emp_type/:id', lc.getAll.bind(lc));

//router.get('/:id', lc.getById.bind(lc));

router.post('/', lc.create.bind(lc));

router.put('/:id', lc.update.bind(lc));

router.delete('/:id', lc.remove.bind(lc));

module.exports = router;