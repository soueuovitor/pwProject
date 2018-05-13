const express = require('express');
const router = express.Router();
const model = require('../models/workshop.model');

router.get('/', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated.
	model.listFeedback(function (feedback) {

		model.listSpeakers(function (speakers) {
			model.listPatrocinadores(function (patrocinadores) {
				model.listColaboradores(function (colaboradores) {
					model.workshop(function (workshop) {
						model.listDias(function (dias) {
							model.listParticipantes(function (participantes) {
								model.list(function (bilhetes) {
									response.set("Content-Type", "text/html");
									response.render('./admin/workshop', {
										numBilhetes: bilhetes,
										numParticipantes: participantes,
										numDias: dias,
										feedback: feedback,
										workshop: workshop,
										colaboradores: colaboradores,
										patrocinadores: patrocinadores,

										speakers: speakers
									});
								});
							})
						});
					});
				});
			});
		});
	});

});



router.get('/:data/delete', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());




	model.removeDia(request.params.data, function () {


		response.redirect('/workshop');
	})
});




router.post('/', function (request, response) {

			model.dayExists(request.body.novoDia, function (exists) {
					if (exists){




						var data = {





							'data': request.body.novoDia
						};
						model.createDia(data, function () {});


						response.json({
							success: "Updated Successfully",
							status: 200
						});

			



					}else{



		
						response.json({
							success: "Updated Successfully",
							status: 400
						});
					
					}


					
				
					})

			});


		router.post('/nome', function (request, response) {



			var data = {



				'id': request.body.idWorkshop,

				'nome': request.body.nomeWorkshop
			};
			model.updateNome(data, function () {});


			response.json({
				success: "Updated Successfully",
				status: 200
			});


		});



		router.post('/preco', function (request, response) {



			var data = {



				'id': request.body.idWorkshop,

				'preco': request.body.precoWorkshop
			};
			model.updatePreco(data, function () {});


			response.json({
				success: "Updated Successfully",
				status: 200
			});


		});


		router.post('/salario', function (request, response) {



			var data = {



				'id': request.body.idWorkshop,

				'salario': request.body.salarioWorkshop
			};
			model.updateSalario(data, function () {});


			response.json({
				success: "Updated Successfully",
				status: 200
			});


		});




		router.post('/ocupacao', function (request, response) {



			var data = {



				'id': request.body.idWorkshop,

				'ocupacao': request.body.ocupacaoWorkshop
			};
			model.updateOcupacao(data, function () {});


			response.json({
				success: "Updated Successfully",
				status: 200
			});


		});


		module.exports = router;