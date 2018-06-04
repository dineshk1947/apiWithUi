var connection = require('../utils/db/mysqlConnection');

function LeadNormalModel() {
   this.dbMySQL = connection;
}

LeadNormalModel.prototype.getAll = function (params,callback) {   
    
    this.dbMySQL.query(params.sql, function (err, results) {
        callback(err, results);
    });
};

LeadNormalModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM lead  where id='+id, function (err, results) {
         callback(err, results);
    });
};

LeadNormalModel.prototype.create = function (data, callback) {
	console.log(data);
    this.dbMySQL.query('insert into lead SET ?', data,function (err, results) {
		console.log(err);
		console.log(results);
      callback(err, results);
    });
};

LeadNormalModel.prototype.update = function (data, id, callback) {
    console.log("UPODATE ");
    console.log(id);
    console.log(data);
    this.dbMySQL.query('UPDATE lead SET ? WHERE id = ' + id, data, function (err, results) {
      callback(err, results);
	  console.log("********");
      console.log(err);
      console.log(results);
    });
};

LeadNormalModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM lead WHERE id = '+id, function (err, results) {
      callback(err, results);
    });
};

LeadNormalModel.prototype.getByBsm = function (callback) {
    this.dbMySQL.query('select * from employer_details where emp_type=3', function (err, results) {
        console.log(err);
        console.log(results);
      callback(err, results);
    });
};

module.exports = LeadNormalModel;
