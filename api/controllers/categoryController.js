var CategoryModel = require('../models/categoryModel');
var CommonController = require('../utils/controller/controllerUtil');
var cc;
var controllerUtil;

function CategoryController() {
    cc = new CategoryModel();
    controllerUtil = new CommonController();
}

CategoryController.prototype.getAll = function (req, res, next) {
     controllerUtil.getAll(cc, req, res, next);
};

CategoryController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(cc, req, res, next);
};

CategoryController.prototype.create = function (req, res, next) {
    controllerUtil.create(cc, req, res, next);
};

CategoryController.prototype.update = function (req, res, next) {
    controllerUtil.update(cc, req, res, next);
};

CategoryController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(cc, req, res, next);
};

module.exports = CategoryController;
