var connection = require('../utils/db/mysqlConnection');
var md5 = require('md5');

function EmpDetailModel() {
   this.dbMySQL = connection;
}

EmpDetailModel.prototype.getAll = function (params,callback) {
    this.dbMySQL.query('select ed.id,ed.emp_firstname,ed.emp_lastname,ed.emp_mailid,ed.emp_mobileno,ed.emp_pwd,ed.emp_address,ed.`status`,ed.created_date,ed.modify_date,et.emp_type from employer_details ed ,emp_type et where ed.emp_type = et.id', function (err, results) {
        
        callback(err, results);
    });
};

EmpDetailModel.prototype.getById = function (params, id, callback) {
    this.dbMySQL.query('SELECT * FROM employer_details  where id='+id, function (err, results) {
         callback(err, results);
    });
};

EmpDetailModel.prototype.create = function (data, callback) {
    console.log(data);
	console.log("*********");
	data.emp_pwd = md5(data.emp_pwd);
	console.log(data.emp_type);
	console.log("*********");
	if(data.emp_type == 'EventManager'){
		data.emp_type = 2;
	} else {
		if(data.emp_type == 'BackOffice'){
		data.emp_type = 3;
	   } else {
		if(data.emp_type == 'BSM'){
		  data.emp_type = 4;
	    } else {
			data.emp_type = 2;
		}  
	   }
	}
	/* var data = {
         "emp_firstname":data.emp_firstname,
         "emp_lastname":data.emp_lastname,
         "emp_mobileno":data.emp_mobileno,
         "emp_mailid":data.emp_mailid,         
         "emp_pwd":pwd,
         "emp_address":data.emp_address,
         "emp_type":data.emp_type,
         "status":data.status
    }; */
    this.dbMySQL.query('insert into employer_details SET ?', data,function (err, results) {
	  callback(err, results);
	  console.log(err)
    });
};

EmpDetailModel.prototype.update = function (data, id, callback) {
	data.emp_pwd = md5(data.emp_pwd);
	delete data.emp_pwd;
	if(data.emp_type == 'EventManager'){
		data.emp_type = 2;
	} else {
		if(data.emp_type == 'BackOffice'){
		data.emp_type = 3;
	   } else {
		if(data.emp_type == 'BSM'){
		  data.emp_type = 4;
	    } else {
			data.emp_type = 2;
		}   
	   }
	}
    this.dbMySQL.query('UPDATE employer_details SET ? WHERE id = ' + id, data, function (err, results) {
      callback(err, results);
    });
};

EmpDetailModel.prototype.remove = function (id, callback) {
    this.dbMySQL.query('DELETE FROM employer_details WHERE id = '+id, function (err, results) {
      callback(err, results);
	  console.log(err);
	  console.log("EMp detaisl");
    });
};

module.exports = EmpDetailModel;
