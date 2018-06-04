var connection = require('../utils/db/mysqlConnection');

function GetCatsMenuLevelModel() {
   this.dbMySQL = connection;
}

GetCatsMenuLevelModel.prototype.getAll = function (params,callback) {
  console.log("CAtegory2");
    this.dbMySQL.query('SELECT * FROM category', function (err, results) {
        callback(err, results);
    });
};

GetCatsMenuLevelModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM category  where cat_id='+id, function (err, results) {
         callback(err, results);
    });
};

GetCatsMenuLevelModel.prototype.create = function (data, callback) {
    this.dbMySQL.query('insert into category SET ?', data,function (err, results) {
      callback(err, results);
    });
};

GetCatsMenuLevelModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE category SET ? WHERE cat_id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

GetCatsMenuLevelModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM category WHERE cat_id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = GetCatsMenuLevelModel;
