var LeadModel = require('../models/leadModel');
var CommonController = require('../utils/controller/controllerUtil');
var lm;
var controllerUtil;

function LeadController() {
    lm = new LeadModel();
    controllerUtil = new CommonController();
}

LeadController.prototype.getAll = function (req, res, next) {
    var empLeadSearch ={};
    
var sql= {};


if (req.params) {
    if (req.params.emp_type == 1) {
        sql = "select l.id as lead_id,l.*,ed.* from lead as l LEFT JOIN  employer_details as ed ON l.emp_id=ed.id";
    } else {
        if (req.params.emp_type == 4) {
            sql = 'select l.id as lead_id,l.*,ed.* from lead l RIGHT JOIN  employer_details ed ON l.emp_id=ed.id where  l.lead_status=3';
        } else {
            if (req.params.emp_type == 2) {
                sql = 'select l.id as lead_id,l.*,ed.* from lead l RIGHT JOIN  employer_details ed ON l.emp_id=ed.id  where l.emp_id ='+req.params.id ;
            }
			if (req.params.emp_type == 3) {
                sql = 'select l.id as lead_id,l.*,ed.* from lead as l LEFT JOIN  employer_details as ed ON l.emp_id=ed.id';
            } 
        }
    }
}
lm.sql = sql;
	console.log("Controller ");
    console.log(req.params);
    console.log(lm.sql);
    lm.empLeadSearch = empLeadSearch;
    
     controllerUtil.getAll(lm, req, res, next);
};

LeadController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(lm, req, res, next);
};

LeadController.prototype.create = function (req, res, next) {
    console.log("********");
    controllerUtil.create(lm, req, res, next);
};

LeadController.prototype.update = function (req, res, next) {
    console.log("Updateee");
    controllerUtil.update(lm, req, res, next);
};

LeadController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(lm, req, res, next);
};

module.exports = LeadController;
