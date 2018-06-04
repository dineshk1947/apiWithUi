var express = require('express');
var router = express.Router();
var EmpTypeController = require('../controllers/empTypeController');
var etc = new EmpTypeController();

router.get('/', etc.getAll.bind(etc));

router.get('/:id', etc.getById.bind(etc));

router.post('/', etc.create.bind(etc));

router.put('/:id', etc.update.bind(etc));

router.delete('/:id', etc.remove.bind(etc));

module.exports = router;
