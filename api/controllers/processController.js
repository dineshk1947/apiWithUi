var ProcessModel = require('../models/processModel');
var CommonController = require('../utils/controller/controllerUtil');
var pm;
var controllerUtil;

function ProcessController() {
    pm = new ProcessModel();
    controllerUtil = new CommonController();
}

ProcessController.prototype.getAll = function (req, res, next) {
    controllerUtil.getAll(pm, req, res, next);
};

module.exports = ProcessController;
