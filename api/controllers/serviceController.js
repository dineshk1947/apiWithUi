var ServiceModel = require('../models/serviceModel');
var CommonController = require('../utils/controller/controllerUtil');
var sm;
var controllerUtil;

function ServiceController() {
    sm = new ServiceModel();
    controllerUtil = new CommonController();
}

ServiceController.prototype.getAll = function (req, res, next) {
    controllerUtil.getAll(sm, req, res, next);
};

ServiceController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(sm, req, res, next);
};

ServiceController.prototype.create = function (req, res, next) {
    controllerUtil.create(sm, req, res, next);
};

ServiceController.prototype.update = function (req, res, next) {
    controllerUtil.update(sm, req, res, next);
};

ServiceController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(sm, req, res, next);
};

module.exports = ServiceController;
