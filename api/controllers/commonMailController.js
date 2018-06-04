
var nodemailer = require("nodemailer");

function commonMailController() {
  
}

commonMailController.prototype.register = function (req, res, next) {

      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'johnmicky56@gmail.com',
            pass: 'dvrcollege'
          },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "johnmicky56@gmail.com", // sender address
    to: req.body.mail, // list of receivers
    subject: " ✔ Lead Management Registered Successfully", // Subject line
    text: "You Are Registered ✔", // plaintext body
    html: '<!DOCTYPE html><html><head><style>html {background-color: burlywood;}.mail-header {background-color:#f0f3f5;text-align: center;margin: 0px;}.mail-body{font-size: 32px;color: white;text-align: center;margin-top: 50px;}.mail-body-welcome{text-align: center;margin: 20px;font-size: 43px;color: brown;}</style></head><body><h1 class="mail-header">Welcome To Lead Management</h1><div class="mail-body">thank you For Registering in Lead Management.</div><div class="mail-body-welcome">May All Who Enter As Guests , Leave As Friends.</div></body></html>'
}



transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send(info);
    }
  });

};

module.exports = commonMailController;
