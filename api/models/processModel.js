var connection = require('../utils/db/mysqlConnection');

function ProcessModel() {
   this.dbMySQL = connection;
}

ProcessModel.prototype.getAll = function (params,callback) {
  console.log("CAtegory2");
    this.dbMySQL.query('SELECT * FROM stages', function (err, results) {
        callback(err, results);
    });
};


module.exports = ProcessModel;
