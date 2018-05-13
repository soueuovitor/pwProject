const express = require('express');
const router = express.Router();
const users = require('../models/feedback.model');

var nodemailer = require('nodemailer');



router.get('/', function(request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated)
	users.listFeedback(function (feedback) {
		
		response.set("Content-Type", "text/html");
		response.render('./admin/feedback',{

			feedback: feedback

		})
	})
	});


	
		
router.post('/enviar', function (request, response) {




             function h() {
                        //console.log(request.user);
                        //console.log(request.isAuthenticated.


                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'nortephotographyminho@gmail.com',
                                pass: 'gonca1234'
                            }
                        });


                        var mailOptions = {
                            from: 'nortephotographyminho@gmail.com',
                            to: request.body.email,
                            subject: 'Norte Photography Workshop',
                            html: '<h1>Norte Photography</h1>' + '<p> ' + request.body.resposta + '</p>'
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });


                    }
                  
                  
                    h();





	response.json({
		success: "Updated Successfully",
		status: 200
	});


});


    
    
    
    

module.exports = router;