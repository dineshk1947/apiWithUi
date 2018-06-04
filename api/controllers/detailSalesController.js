var DetailSalesModel = require('../models/detailSalesModel');
var CommonController = require('../utils/controller/controllerUtil');
var dsm;
var controllerUtil;

function DetailSalesController() {
    dsm = new DetailSalesModel();
    controllerUtil = new CommonController();
}

DetailSalesController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(dsm, req, res, next);
};

DetailSalesController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(dsm, req, res, next);
};

DetailSalesController.prototype.create = function (req, res, next) {
    controllerUtil.create(dsm, req, res, next);
};

DetailSalesController.prototype.update = function (req, res, next) {
    controllerUtil.update(dsm, req, res, next);
};

DetailSalesController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(dsm, req, res, next);
};

module.exports = DetailSalesController;
