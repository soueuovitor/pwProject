const express = require('express');
const router = express.Router();
const modeloColab = require('../models/alterColab.model');



router.get('/:usernameColab', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modeloColab.listFeedback(function (feedback) {

	modeloColab.readColab(request.params.usernameColab, function (alterColab) {
		response.set("Content-Type", "text/html");
		response.render('./admin/alterColab', {
			feedback: feedback,
			colab: alterColab
		})
	})

	})
});


router.get('/:id/delete', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modeloColab.removeColaborador(request.params.id, function (meme) {
	response.redirect('/colab');
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

				'username': request.body.username,
				'name': request.body.name,
				'email': request.body.email,
				'numero': request.body.numero,
				'horario': request.body.horario,
				'morada': request.body.morada,
				'funcao': request.body.funcao,
				'admin' :request.body.admin


			};
			modeloColab.updateColab(data, function () {});


			response.json({
				success: "Updated Successfully",
				status: 200
			});

	

	}
		
	});








router.post('/pago', function (request, response) {
	request.checkBody('numero', 'Numero deve ter entre 9 a 13 caracteres').isLength({min: 8, max: 13});
	request.checkBody('username', 'Username deve ter entre 5 a 20 caracteres').isLength({min: 5, max: 20});
	
	var errors = request.validationErrors();	
	
	if (errors) {
		response.json({
				error: 'numbero',
				status: 400
			
			});
	}else{
			var data2 = {
				'username': request.body.username,

				'name': request.body.name,
				'email': request.body.email,
				'numero': request.body.numero,
				'horario': request.body.horario,
				'morada': request.body.morada,
				'salario': request.body.salario,
				'nif': request.body.nif,
				'funcao': request.body.funcao,
				'admin' :request.body.admin

			};
			modeloColab.updateColabPago(data2, function () {});


			response.json({
				success: "Updated Successfully",
				status: 200
			});





	}


});




module.exports = router;