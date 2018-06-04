var connection = require('../utils/db/mysqlConnection');

function DetailSalesModel() {
   this.dbMySQL = connection;
}

DetailSalesModel.prototype.getAll = function (params,callback) {
  console.log("CAtegory2");
    this.dbMySQL.query('SELECT * FROM detail_sales', function (err, results) {
        callback(err, results);
    });
};

DetailSalesModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM detail_sales  where detail_sale_id='+id, function (err, results) {
         callback(err, results);
    });
};

DetailSalesModel.prototype.create = function (data, callback) {
    this.dbMySQL.query('insert into detail_sales SET ?', data,function (err, results) {
      callback(err, results);
    });
};

DetailSalesModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE detail_sales SET ? WHERE detail_sale_id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

DetailSalesModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM detail_sales WHERE detail_sale_id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = DetailSalesModel;
