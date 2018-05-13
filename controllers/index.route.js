	const express = require('express');
	const router = express.Router();
	const usersModel = require('../models/index.model');
	const passport = require('passport');
	var GoogleAuth = require('google-auth-library');
	const userModel = require('../models/user.model');
	var nodemailer = require('nodemailer');
	var crypto = require("crypto");



router.post('/enviarMail', function(request, response){

	data = {
		'nome': request.body.nome,
		'email': request.body.email,
		'mensagem': request.body.mensagem,
	

	}



	var password = crypto.randomBytes(20).toString('hex');

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
			html: '<h1>Norte Photography</h1>' + '<p>Olá ' + request.body.nome + '!</p>' + '<p>Recebemos o seu feedback e responderemos o mais rápido possível!</p>' + '<h2>Esperamos por si!</h2>' 
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

	userModel.createFeedback(data, function () {});



				response.json({
					error: "erro na base de dados",
					status: 200

				});

})




	router.post('/tokensignin', function (request, response) {

		userModel.readGoogle(request.body.ID, function (areValid) {
			if (areValid) {






				response.json({
					error: "erro na base de dados",
					status: 300

				});

			} else {


				userModel.emailExists(request.body.email, function (areValid) {
					if (areValid) {


						response.json({
							error: "erro na base de dados",
							status: 450
						});






					} else {
						var password = crypto.randomBytes(20).toString('hex');

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
								html: '<h1>Norte Photography</h1>' + '<p>Olá ' + request.body.nome + '!</p>' + '<p>Bem vindo à equipa Norte Photography, temos alguns dos melhores workshops em fotografia para si!</p>' + '<h2>As suas credenciais são: </h2>' + '<p>username: ' + request.body.username + '</p>' + '<p>Password: ' + password + '</p>' + '<h2>Visite-nos em: </h2>' + '<h2> </h2>'
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


















						var data = {
							'username': request.body.username,
							'nome': request.body.nome,
							'email': request.body.email,
							'id': request.body.ID,
							'password': password

						};
						userModel.createGoogle(data, function () {});



						response.json({
							success: "Updated Successfully",
							status: 250
						});









					}
				});
			}
		});
	});






	router.get('/', function (request, response) {

		//console.log(request.user);
		var user = request.user;


		if (request.isAuthenticated()) {
			usersModel.listSpeakers(function (speakers) {
				usersModel.listWorkshop(function (workshop) {

					usersModel.listSessoes(function (sessoes) {
						usersModel.listDias(function (dias) {
							usersModel.listPatrocinadores(function (patrocinadores) {



								usersModel.readParticipante(user.username, function (alterParticipante) {

									response.set("Content-Type", "text/html");
									response.render('index', {

										arrayPatrocinadores: patrocinadores,
										dias: dias,
										participante: alterParticipante,
										workshop: workshop,
										arraySpeakers: speakers,
										arraySessoes: sessoes
									})
								})
							})
						})
					})
				})
			})

		} else {

			usersModel.listSpeakers(function (speakers) {

				userModel.listWorkshop(function (workshop) {

					usersModel.listSessoes(function (sessoes) {
						usersModel.listDias(function (dias) {
							usersModel.listPatrocinadores(function (patrocinadores) {

								response.set("Content-Type", "text/html");
								response.render('index', {

									arrayPatrocinadores: patrocinadores,
									dias: dias,
									workshop: workshop,
									arraySpeakers: speakers,
									arraySessoes: sessoes
								})
							})
						})

					})
				})
			})
		}

	});





	module.exports = router;