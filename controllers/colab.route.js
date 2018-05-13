const express = require('express');
const router = express.Router();
const modelColab = require('../models/colab.model');



router.get('/', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modelColab.listFeedback(function (feedback) {

	modelColab.listWorkshop(function (workshop){
	modelColab.listColaboradores(function (colaboradores) {
		response.set("Content-Type", "text/html");
		response.render('./admin/colaborador', {
			feedback:feedback,
			arrayColaboradores: colaboradores,
			workshop: workshop
		})
		})
	})
	})
});


router.get('/:username', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modelColab.read(request.params.username, function(alterColab) {
	modelColab.listColaboradores(function (colaboradores) {
		response.set("Content-Type", "text/html");
		response.render('./admin/alterarColab', {
			arrayColaboradores: colaboradores,
			colab : alterColab
		})
	})
})
});



module.exports = router;