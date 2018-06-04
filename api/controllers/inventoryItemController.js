var InventoryItemModel = require('../models/inventoryItemModel');
var CommonController = require('../utils/controller/controllerUtil');
var iic;
var controllerUtil;

function InventoryItemController() {
    iic = new InventoryItemModel();
    controllerUtil = new CommonController();
}

InventoryItemController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(iic, req, res, next);
};

InventoryItemController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(iic, req, res, next);
};

InventoryItemController.prototype.create = function (req, res, next) {
    controllerUtil.create(iic, req, res, next);
};

InventoryItemController.prototype.update = function (req, res, next) {
    controllerUtil.update(iic, req, res, next);
};

InventoryItemController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(iic, req, res, next);
};

module.exports = InventoryItemController;
