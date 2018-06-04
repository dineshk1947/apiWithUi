var connection = require('../utils/db/mysqlConnection');

function BranchModel() {
   this.dbMySQL = connection;
}

BranchModel.prototype.getAll = function (params,callback) {
    this.dbMySQL.query('SELECT * FROM branches  where rec_status=1', function (err, results) {
       callback(err, results);
    });
};

BranchModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM branches  where branch_id='+id, function (err, results) {
         callback(err, results);
    });
};

BranchModel.prototype.create = function (data, callback) {
    this.dbMySQL.query('insert into branches SET ?', data,function (err, results) {
      callback(err, results);
    });
};

BranchModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE branches SET ? WHERE branch_id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

BranchModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM branches WHERE branch_id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = BranchModel;
