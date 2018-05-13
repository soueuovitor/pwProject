const express = require('express');
const router = express.Router();
const modelSpeakers = require('../models/participantes.model');



router.get('/', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modelSpeakers.listFeedback(function (feedback) {

	modelSpeakers.listBilhetes(function (bilhetes) {
		modelSpeakers.listDias(function (dias) {
			modelSpeakers.listParticipantes(function (participantes) {
				var bilhetesUsers = [{}];
				for (var d of dias) {
					for (var b of bilhetes) {

						for (var p of participantes) {
							var numeroBilhetes = 0;
							var user = 0;
							if (d.data.toLocaleDateString() == b.data_bilhete.toLocaleDateString() && b.username_comprador == p.username_part) {


								for (var p of participantes) {
									

									if (d.data.toLocaleDateString() == b.data_bilhete.toLocaleDateString() && b.username_comprador == p.username_part) {

										numeroBilhetes++;
										user = b.username_comprador;
								

													
				
										for (var n of bilhetesUsers){
											if (n.username_array == p.username_part && d.data.toLocaleDateString() == n.data_bilhetes ){
												n.numero = n.numero + 1;
											}else{
												var i = 0;
												for (var e of bilhetesUsers){
													if (e.username_array == p.username_part && d.data.toLocaleDateString() == e.data_bilhetes){
														i++;
													}else{

													}
													}
													if(i == 0){
														bilhetesUsers.push({'numero': 0, 'data_bilhetes':b.data_bilhete.toLocaleDateString(), 'username_array': user});

												
												}
											}
			
										}

									}
								
								}
				
	
							}	
						}
					



					}
				}
				
			

				response.set("Content-Type", "text/html");
				response.render('./admin/participantes', {
					participantes: participantes,
					dias: dias,
					feedback:feedback,
					bilhetes: bilhetes,
					bilhetesUsers : bilhetesUsers
				})
			})
			})
		})
	})
});

router.post('/', function (request, response) {
	request.checkBody('numero', 'Numero deve ter entre 9 a 13 caracteres').isLength({min: 8, max: 13});
	request.checkBody('username', 'Username deve ter entre 5 a 20 caracteres').isLength({min: 5, max: 20});
	
	var errors = request.validationErrors();	
	
	if (errors) {
		response.json({
				error: 'username invalido',
				status: 400
			
			});
	}else{


	var data = {

		'name': request.body.name,
		'morada': request.body.morada,
		'email': request.body.email,
		'numero': request.body.numero,
		'cache': request.body.cache
	};
	modelSpeakers.createSpeakers(data, function () {});


	response.json({
		success: "Updated Successfully",
		status: 200
	});

	}


});



module.exports = router;