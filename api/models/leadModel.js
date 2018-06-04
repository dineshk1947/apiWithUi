var connection = require('../utils/db/mysqlConnection');

function LeadModel() {
   this.dbMySQL = connection;
}

LeadModel.prototype.getAll = function (params,callback) {   
    this.dbMySQL.query(params.sql, function (err, results) {
        callback(err, results);
    });
};

LeadModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM lead  where id='+id, function (err, results) {
         callback(err, results);
    });
};

LeadModel.prototype.create = function (data, callback) {
	console.log(data);
    this.dbMySQL.query('insert into lead SET ?', data,function (err, results) {
		console.log(err);
		console.log(results);
      callback(err, results);
    });
};

LeadModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE lead SET ? WHERE id = ' + id, data, function (err, results) {
      callback(err, results);
	  console.log("********");
	  console.log(err);
    });
};

LeadModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM lead WHERE id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = LeadModel;
