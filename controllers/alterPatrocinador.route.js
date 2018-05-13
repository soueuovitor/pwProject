const express = require('express');
const router = express.Router();
const modeloColab = require('../models/alterPatrocinio.model');



router.get('/:name', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modeloColab.listFeedback(function (feedback) {

		modeloColab.readPatrocinio(request.params.name, function (alterPatrocinador) {
			response.set("Content-Type", "text/html");
			response.render('./admin/alterPatrocinador', {

				patrocinador: alterPatrocinador,
				feedback: feedback
			})
		})
	})
});

router.get('/:name/delete', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modeloColab.removePatrocinio(request.params.name, function (alterPatrocinador) {
		response.redirect('/patrocinadores');
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