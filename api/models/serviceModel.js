var connection = require('../utils/db/mysqlConnection');

function ServiceModel() {
   this.dbMySQL = connection;
}

ServiceModel.prototype.getAll = function (params,callback) {
    this.dbMySQL.query('select id,service_name,service_price,IF(selected, "true", "false") selected  from service', function (err, results) {
       callback(err, results);
    });
};

ServiceModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM service  where id='+id, function (err, results) {
         callback(err, results);
    });
};

ServiceModel.prototype.create = function (data, callback) {
    this.dbMySQL.query('insert into service SET ?', data,function (err, results) {
      callback(err, results);
    });
};

ServiceModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE service SET ? WHERE id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

ServiceModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM service WHERE id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = ServiceModel;
