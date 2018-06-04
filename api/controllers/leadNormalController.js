var LeadNormalModel = require('../models/leadNormalModel');
var CommonController = require('../utils/controller/controllerUtil');
var lm;
var controllerUtil;

function LeadNormalController() {
    lm = new LeadNormalModel();
    controllerUtil = new CommonController();
}

LeadNormalController.prototype.getAll = function (req, res, next) {

var sql= {};
if (req.params) {
    if (req.params.emp_type == 1) {
        sql = "select l.*,ed.* from lead as l LEFT JOIN  employer_details as ed ON l.emp_id=ed.id";
    } else {
        if (req.params.emp_type == 4) {
            sql = 'select l.*,ed.* from lead l RIGHT JOIN  employer_details ed ON l.emp_id=ed.id where  l.lead_status=3';
        } else {
            if (req.params.emp_type == 2) {
                sql = 'select l.*,ed.* from lead l RIGHT JOIN  employer_details ed ON l.emp_id=ed.id  where l.emp_id ='+req.params.id ;
            }
			if (req.params.emp_type == 3) {
                sql = 'select l.id as lead_id,l.*,ed.* from lead as l LEFT JOIN  employer_details as ed ON l.emp_id=ed.id';
            } 
        }
    }
}
lm.sql = sql;
	console.log("Controller Normal ");
    console.log(req.query);
    console.log(req.body);
    console.log(req.params);
    console.log(sql);
   
    controllerUtil.getAll(lm, req, res, next);
};

LeadNormalController.prototype.getById = function (req, res, next) {
    controllerUtil.getById(lm, req, res, next);
};

LeadNormalController.prototype.create = function (req, res, next) {
    controllerUtil.create(lm, req, res, next);
};

LeadNormalController.prototype.update = function (req, res, next) {
    controllerUtil.update(lm, req, res, next);
};

LeadNormalController.prototype.remove = function (req, res, next) {
    controllerUtil.remove(lm, req, res, next);
};

LeadNormalController.prototype.getByBsm = function (req, res, next) {
   lm.getByBsm(function(err, data){
       console.log(err);
       console.log(data);
       res.json(data);
   });
};
module.exports = LeadNormalController;
