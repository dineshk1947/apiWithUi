var connection = require('../utils/db/mysqlConnection');
var md5 = require('md5');
function loginModel() {
    this.dbMySQL = connection;
}

loginModel.prototype.getAuth = function (req, res, callback) {
    var pwd = md5(req.body.emp_pwd);
    console.log(pwd);
    this.dbMySQL.query("select * from employer_details where emp_mailid='" + req.body.emp_email + "' and emp_pwd='" + pwd + "' and status='Active'", function (err, data) {
        callback(err, data);
    });
}


loginModel.prototype.create = function (req, res, callback) {
    var pwd = md5(req.body.emp_pwd);
	console.log(req.body.emp_type);
	if(req.body.emp_type == 'EventManager'){
		req.body.emp_type = 2;
	} else {
		if(req.body.emp_type == 'BackOffice'){
		req.body.emp_type = 3;
	   } else {
		if(req.body.emp_type == 'BSM'){
		  req.body.emp_type = 4;
	    } else {
            req.body.emp_type = 2;
        }  
	   }
	}
    var data = {
         "emp_firstname":req.body.emp_firstname,
         "emp_lastname":req.body.emp_lastname,
         "emp_mobileno":req.body.emp_mobileno,
         "emp_mailid":req.body.emp_mailid,         
         "emp_pwd":pwd,
         "emp_address":req.body.emp_address,
         "emp_type":req.body.emp_type,
         "status":"Active" 
    };
    this.dbMySQL.query('insert into employer_details SET ?', data, function (err, results) {
        console.log(err);
        data.id = results.insertId;
        callback(err, data);
    });
}
module.exports = loginModel;