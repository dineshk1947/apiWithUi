var connection = require('../utils/db/mysqlConnection');

function CouponModel() {
   this.dbMySQL = connection;
}

CouponModel.prototype.getAll = function (params,callback) {
    this.dbMySQL.query('SELECT * FROM coupons', function (err, results) {
        callback(err, results);
    });
};

CouponModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM coupons  where coupon_id='+id, function (err, results) {
         callback(err, results);
    });
};

CouponModel.prototype.create = function (data, callback) {
    console.log(data);
    this.dbMySQL.query('insert into coupons SET ?', data,function (err, results) {
      callback(err, results);
    });
};

CouponModel.prototype.update = function (data, id, callback) {
    this.dbMySQL.query('UPDATE coupons SET ? WHERE coupon_id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

CouponModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM coupons WHERE coupon_id = '+id, function (err, results) {
      callback(err, results);
    });
};

module.exports = CouponModel;
