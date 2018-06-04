function ControllerUtilFunction() {
}

ControllerUtilFunction.prototype.getAll = function (commonModel, req, res, next, callback) {
    var params={};   
    params.sql = commonModel.sql;
    commonModel.getAll(params, function (err, data) {
        if (err) {
            return next({ status: 500, error: err });
        }
        if (!Object.keys(data).length) {
            res.status(404).json({ "message": "No Records Found" });
        } else {
            res.status(200).json(data);
        }
    });
};

ControllerUtilFunction.prototype.getById = function (commonModel, req, res, next, callback) {
    var params = {};
    commonModel.getById(params, req.params.id, function (err, data) {
        if (err) {
            return next({ status: 500, error: err });
        }
        if (!Object.keys(data).length) {
            res.status(404).json({ "message": "No Records Found" });
        } else {
            res.status(200).json(data);
        }
    });
};

ControllerUtilFunction.prototype.create = function (commonModel, req, res, next, callback) {
    var data = req.body;
    commonModel.create(data, function (err, result) {
        if (err) {
            return next({ status: 500, error: err });
        } else {
            data.id = result.insertId;
            res.status(201).json(data);
        }
    });
};

ControllerUtilFunction.prototype.update = function (commonModel, req, res, next, callback) {
    var data = req.body;
    commonModel.update(data, req.params.id, function (err, result) {
        if (err) {
            return next({ status: 500, error: err });
        } else {
            data.id = req.params.id;
            data.changedRows = result.changedRows;
            res.status(200).json(data);
        }
    });
};

ControllerUtilFunction.prototype.remove = function (commonModel, req, res, next) {
	console.log(req.params.id);
   commonModel.remove(req.params.id, function (err, result) {
        if (err) {
            return next({ status: 500, error: err });
        } else if (result.affectedRows <= 0) {
            return next({ status: 404, error: { message: 'Record Not Found To Delete' } });
        } else {
            res.status(200).send(JSON.stringify({
                message: ' 1 record deleted.'
            }));
        }
    });
};

module.exports = ControllerUtilFunction;
