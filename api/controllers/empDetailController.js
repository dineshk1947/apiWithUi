var EmpDetailModel = require('../models/empDetailModel');
var CommonController = require('../utils/controller/controllerUtil');
var edm;
var controllerUtil;
function EmpDetailController() {
    edm = new EmpDetailModel();
    controllerUtil = new CommonController();
}

EmpDetailController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(edm, req, res, next);
};

EmpDetailController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(edm, req, res, next);
};

EmpDetailController.prototype.create = function (req, res, next) {
    controllerUtil.create(edm, req, res, next);
};

EmpDetailController.prototype.update = function (req, res, next) {
    controllerUtil.update(edm, req, res, next);
};

EmpDetailController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(edm, req, res, next);
};

module.exports = EmpDetailController;
