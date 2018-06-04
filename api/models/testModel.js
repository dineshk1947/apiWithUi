var connection = require('../utils/db/mysqlConnection');

function TestModel() {
   this.dbMySQL = connection;
}

TestModel.prototype.getAll = function (params,callback) {
    this.dbMySQL.query('SELECT * FROM test', function (err, results) {
       callback(err, results);
    });
};

TestModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM test  where id='+id, function (err, results) {
         callback(err, results);
    });
};

TestModel.prototype.create = function (data, callback) {
    this.dbMySQL.query('insert into test SET ?', data,function (err, results) {
      callback(err, results);
    });
};

TestModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE test SET ? WHERE id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

TestModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM test WHERE id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = TestModel;
