var LeadNormalModel = require('../models/leadNormalModel');
var CommonController = require('../utils/controller/controllerUtil');
var lm;
var controllerUtil;

function LeadNormalController() {
    lm = new LeadNormalModel();
    controllerUtil = new CommonController();
}

LeadNormalController.prototype.getByBsm = function (req, res, next) {
    lm.getByBsm(function(err,data){
        if (err) {
            return next({ status: 500, error: err });
        }
        if (!Object.keys(data).length) {
            res.status(404).json({ "message": "No Records Found" });
        } else {
            res.status(200).json(data);
        }    
    });
};
module.exports = LeadNormalController;
