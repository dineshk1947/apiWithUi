var express = require('express');
var router = express.Router();
var BranchController = require('../controllers/branchController');
var bc = new BranchController();

router.get('/', bc.getAll.bind(bc));

router.get('/:id', bc.getById.bind(bc));

router.post('/', bc.create.bind(bc));

router.put('/:id', bc.update.bind(bc));

router.delete('/:id', bc.remove.bind(bc));

module.exports = router;
