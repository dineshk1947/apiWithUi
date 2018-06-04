var BranchModel = require('../models/branchsModel');
var CommonController = require('../utils/controller/controllerUtil');
var gdm;
var controllerUtil;

function BranchController() {
    bm = new BranchModel();
    controllerUtil = new CommonController();
}

BranchController.prototype.getAll = function (req, res, next) {
    controllerUtil.getAll(bm, req, res, next);
};

BranchController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(bm, req, res, next);
};

BranchController.prototype.create = function (req, res, next) {
    controllerUtil.create(bm, req, res, next);
};

BranchController.prototype.update = function (req, res, next) {
    controllerUtil.update(bm, req, res, next);
};

BranchController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(bm, req, res, next);
};

module.exports = BranchController;
