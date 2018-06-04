var EmpTypeModel = require('../models/empTypeModel');
var CommonController = require('../utils/controller/controllerUtil');
var etm;
var controllerUtil;
function EmpTypeController() {
    etm = new EmpTypeModel();
    controllerUtil = new CommonController();
}

EmpTypeController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(etm, req, res, next);
};

EmpTypeController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(etm, req, res, next);
};

EmpTypeController.prototype.create = function (req, res, next) {
    controllerUtil.create(etm, req, res, next);
};

EmpTypeController.prototype.update = function (req, res, next) {
    controllerUtil.update(etm, req, res, next);
};

EmpTypeController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(etm, req, res, next);
};

module.exports = EmpTypeController;
