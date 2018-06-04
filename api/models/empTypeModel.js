var connection = require('../utils/db/mysqlConnection');

function BranchModel() {
   this.dbMySQL = connection;
}

BranchModel.prototype.getAll = function (params,callback) {
    this.dbMySQL.query('SELECT * FROM emp_type', function (err, results) {
       callback(err, results);
    });
};

BranchModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM emp_type  where id='+id, function (err, results) {
         callback(err, results);
    });
};

BranchModel.prototype.create = function (data, callback) {
    this.dbMySQL.query('insert into emp_type SET ?', data,function (err, results) {
      callback(err, results);
    });
};

BranchModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE emp_type SET ? WHERE id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

BranchModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM emp_type WHERE id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = BranchModel;