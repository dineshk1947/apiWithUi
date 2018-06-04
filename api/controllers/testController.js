var TestModel = require('../models/testModel');
var CommonController = require('../utils/controller/controllerUtil');
var tm;
var controllerUtil;

function testController() {
    tm = new TestModel();
    controllerUtil = new CommonController();
}

testController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(tm, req, res, next);
};

testController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(tm, req, res, next);
};

testController.prototype.create = function (req, res, next) {
    controllerUtil.create(tm, req, res, next);
};

testController.prototype.update = function (req, res, next) {
    controllerUtil.update(tm, req, res, next);
};

testController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(tm, req, res, next);
};

module.exports = testController;
