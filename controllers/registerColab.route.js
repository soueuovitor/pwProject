const express = require('express');
const router = express.Router();
const userModel = require('../models/registerColab.model');
const formidable = require('formidable');
const fs = require ('fs');



router.post('/', function (request, response) {

	var form = new formidable.IncomingForm();
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
      var oldpath = files.colab.path;
	  var newpath = './public/img/colab/' + fields.email+'.png';
	  


	userModel.usernameExists(fields.username, function (areValid) {
		if (areValid) {


			response.json({
				error: "erro na base de dados",
				status: 400
			});



		} else {


			userModel.emailExists(fields.email, function (areValid) {
				if (areValid) {


					response.json({
						error: "erro na base de dados",
						status: 450
					});


				} else {
		
					
						fs.rename(oldpath, newpath, function (err) {







							var data = {

								'username': fields.username,
								'name': fields.name,
								'email': fields.email,
								'password': fields.password,
								'numero': fields.numero,
								'horario': fields.horario,
								'morada': fields.morada,
								'funcao': fields.funcao,
								'admin': fields.admin


							};
							userModel.createColab(data, function () {});


							response.json({
								success: "Updated Successfully",
								status: 200
							});



						});
			


				}
			})
		}
	});

});



});


router.post('/pago', function (request, response) {



	
	var form = new formidable.IncomingForm();
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
      var oldpath = files.colabPago.path;
	  var newpath = './public/img/colab/' + fields.email+'.png';
	  


	userModel.usernameExists(fields.username, function (areValid) {
		if (areValid) {


			response.json({
				error: "erro na base de dados",
				status: 400
			});



		} else {


			userModel.emailExists(fields.email, function (areValid) {
				if (areValid) {


					response.json({
						error: "erro na base de dados",
						status: 450
					});


				} else {


			fs.rename(oldpath, newpath, function (err) {





					if (fields.salario === '') {
						var data = {

							'username': fields.username,
							'name': fields.name,
							'email': fields.email,
							'password': fields.password,
							'numero': fields.numero,
							'horario': fields.horario,
							'morada': fields.morada,
							'salario': fields.salarioPredefinido,
							'nif': fields.nif,
							'funcao': fields.funcao,
							'admin': fields.admin
						};
						userModel.createColabPago2(data, function () {});


						response.json({
							success: "Updated Successfully",
							status: 200
						});







					} else {








						var data = {

							'username': fields.username,
							'name': fields.name,
							'email': fields.email,
							'password': fields.password,
							'numero': fields.numero,
							'horario': fields.horario,
							'morada': fields.morada,
							'salario': fields.salario,
							'nif': fields.nif,
							'funcao': fields.funcao,
							'admin': fields.admin

						};
						userModel.createColabPago(data, function () {});


						response.json({
							success: "Updated Successfully",
							status: 200
						});


					}
				});
				}

			})
		}
	});
	});

});













module.exports = router;