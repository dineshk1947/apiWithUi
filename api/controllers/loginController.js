var express = require('express');
app = express();
var loginModel = require('../models/loginModel');
var jwt = require('jsonwebtoken');
var lm;

app.set('superSecret', 'shapesBrow');
function LoginController() {
    lm = new loginModel();
}

LoginController.prototype.getAuth = function (req, res, next) {
    
    lm.getAuth(req, res, function (err, data) {
        if (err) {
            res.status(500).send({ "Message": "Server Error", status: 500 });
        } else {
            if (!Object.keys(data).length)
                res.status(200).send({ "Message": "No Records Found", status: 404 });
            else{
                
                var token;
                token = jwt.sign({data:data}, app.get('superSecret'), {
                    expiresIn: 60 * 60 * 1000
                });
                
                res.status(200).send(JSON.stringify({
                    message: "Authentication Successful",
                    status: 200,
                    empData: data[0],
                    token: token
                }));          
            }
                
        }
    });
}


LoginController.prototype.create = function (req, res, next) {
    
    lm.create(req, res, function (err, data) {
        if (err) {
            res.status(500).send({ "Message": "Server Error", status: 500 });
        } else {
            if (!Object.keys(data).length)
                res.status(200).send({ "Message": "No Records Found", status: 404 });
            else
                res.status(200).send(data[0]);
        }
    });
}
module.exports = LoginController;