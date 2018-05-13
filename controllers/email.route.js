const express = require('express');
const router = express.Router();
const model = require('../models/admin.model');
var nodemailer = require('nodemailer');



router.get('/', function () {
	//console.log(request.user);
	//console.log(request.isAuthenticated.


	model.listSessoes(function (sessoes) {

	model.listSpeakers(function (speakers) {
		model.listPatrocinadores(function (patrocinadores) {
			model.listColaboradores(function (colaboradores) {
				model.workshop(function (workshop) {
					model.listDias(function (dias) {
						model.listParticipantes(function (participantes) {
							model.list(function (bilhetes) {
							
								var transporter = nodemailer.createTransport({
									service: 'gmail',
									auth: {
									  user: 'pregador.desgraca@gmail.com',
									  pass: '913391449155'
									}
								  });
								  for (var p of participantes ){

								  
								  var mailOptions = {
									from: 'pregador.desgraca@gmail.com',
									to:  p.email_part,
									subject: 'Norte Photography Workshop',
									html: '<h1>Sessão de Segunda</h1>'+'<p>Olá ' +p.nome_participante+' Não se esqueça que tem bilhete para alguns do melhores workshops do país amanhã!</p>'
								  };
								  
								  transporter.sendMail(mailOptions, function(error, info){
									if (error) {
									  console.log(error);
									} else {
									  console.log('Email sent: ' + info.response);
									}
								  });


								}

								
								response.redirect('/');

								});
							});
						});
					});
					});
				});
			});
		});
	});









module.exports = router;