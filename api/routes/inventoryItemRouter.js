
var express = require('express');
var router = express.Router();
var InventoryItemController = require('../controllers/inventoryItemController');
var iic = new InventoryItemController();

router.get('/', iic.getAll.bind(iic));

router.get('/:id', iic.getById.bind(iic));

router.post('/', iic.create.bind(iic));

router.put('/:id', iic.update.bind(iic));

router.delete('/:id', iic.remove.bind(iic));

module.exports = router;
