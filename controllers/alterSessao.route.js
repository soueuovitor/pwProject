const express = require('express');
const router = express.Router();
const modeloColab = require('../models/alterSessao.model');



router.get('/:name', global.secure('admin'), function (request, response) {
	modeloColab.listFeedback(function (feedback) {

	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modeloColab.readSessao(request.params.name, function (alterPatrocinador) {
		response.set("Content-Type", "text/html");
		response.render('./admin/alterPatrocinador', {
feedback:feedback,
			patrocinador : alterPatrocinador
		})
	})
	})
});

router.get('/:name/delete', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modeloColab.removeSessao(request.params.name, function (alterPatrocinador) {
	response.redirect('/sessoes');
	})
});






router.post('/', function (request, response) {



			var data = {


				'name': request.body.name,
		
		
				'valor': request.body.valor
			};
			modeloColab.updatePatrocinador(data, function () {});


			response.json({
				success: "Updated Successfully",
				status: 200
			});




	













});




module.exports = router;