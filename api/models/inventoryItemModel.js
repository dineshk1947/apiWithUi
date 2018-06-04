var connection = require('../utils/db/mysqlConnection');

function InventoryItemModel() {
   this.dbMySQL = connection;
}

InventoryItemModel.prototype.getAll = function (params,callback) {
  console.log("CAtegory2");
    this.dbMySQL.query('SELECT * FROM inventory_items', function (err, results) {
        callback(err, results);
    });
};

InventoryItemModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM inventory_items  where inv_id='+id, function (err, results) {
         callback(err, results);
    });
};

InventoryItemModel.prototype.create = function (data, callback) {
    this.dbMySQL.query('insert into inventory_items SET ?', data,function (err, results) {
      callback(err, results);
    });
};

InventoryItemModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE inventory_items SET ? WHERE inv_id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

InventoryItemModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM inventory_items WHERE inv_id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = InventoryItemModel;
