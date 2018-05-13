const express = require('express');
const router = express.Router();
const modelSpeakers = require('../models/comprarBilhete.model');

const model = require('../models/admin.model');
var nodemailer = require('nodemailer');





router.post('/', function (request, response) {
			var numero = 0;
			
			modelSpeakers.readUser(request.body.user, function(userArray) {
			modelSpeakers.workshop(function (workshop) {
						var max = workshop[0].max_bilhetes_dia;
						modelSpeakers.listDias(function (dias) {
							modelSpeakers.listBilhetes(function (bilhetes) {
								
								var numeroTotal = 0;
								var numero = request.body.numero ;
								var dia = request.body.data;
							
								var c   = dia.split('/') ;
									
									
									
									
								var dt2 = parseInt(c[2]) + '-'+ parseInt(c[0])  + '-'+ parseInt(c[1]);
									

							if (dia.includes('/')){
								
					
								for (var b of bilhetes) {

									if (b.data_bilhete === dt2) {
										numero++;
										numeroTotal++;

									}
								

								}
								var c = max-numeroTotal;
								console.log(c);
								if (numero > max) {
									response.json({
										success: "Updated Successfully",
										status: c
									});
								

								} else {


									var data = {

										'dia': dt2,
										'user': request.body.user,

										'numero': request.body.numero


									};
									

									for (var i = 0; i < request.body.numero; i++) {
										modelSpeakers.comprarBilhete(data, function () {});

									}
									
								
								
											
											
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
                            to: userArray.email,
                            subject: 'Norte Photography Workshop',
                            html: '<h1>Norte Photography</h1>' + '<p>Olá ' + request.body.user + '!</p>' + '<p>Comprou Bilhete para o dia ' + dt2 + 'esperamos por si</p>' + '<h2>As suas credenciais são: </h2>' + '<p>username: ' + request.body.username + '</p>' + '<p>Password: ' + request.body.password + '</p>' + '<h2>Visite-nos em: </h2>' + '<h2> </h2>'
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
									
								}
}else{
	
						for (var b of bilhetes) {

									if (b.data_bilhete === request.body.data) {
										numero++;
										numeroTotal++;

									}
								

								}
								var c = max-numeroTotal;
								console.log(c);
								if (numero > max) {
									response.json({
										success: "Updated Successfully",
										status: c
									});
								

								} else {


									var data = {

										'dia': request.body.data,
										'user': request.body.user,

										'numero': request.body.numero


									};
									

									for (var i = 0; i < request.body.numero; i++) {
										modelSpeakers.comprarBilhete(data, function () {});

									}
									
								
								
											
											
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
                            to: userArray.email,
                            subject: 'Norte Photography Workshop',
                            html: '<h1>Norte Photography</h1>' + '<p>Olá ' + request.body.user + '!</p>' + '<p>Comprou Bilhete para o dia ' + dt2 + 'esperamos por si</p>' 
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

								}
							})
						})
					})
				});

});




module.exports = router;