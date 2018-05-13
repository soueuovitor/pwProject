const express = require('express');
const router = express.Router();
const modeloColab = require('../models/alterSpeaker.model');



router.get('/:usernameSpeaker', global.secure('admin'), function (request, response) {
	
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modeloColab.listFeedback(function (feedback) {

	modeloColab.readSpeaker(request.params.usernameSpeaker, function (alterSpeaker) {
		response.set("Content-Type", "text/html");
		response.render('./admin/alterSpeaker', {
			feedback: feedback,
			speaker: alterSpeaker
		})
	})
	})
});

 

router.get('/:email/delete', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modeloColab.removeSpeaker(request.params.email, function (meme) {
		response.redirect('/speakers');
	})
});




router.post('/', function (request, response) {




	var data = {

		'id': request.body.id_speaker,
		'name': request.body.name,
		'numero': request.body.numero,
		'horario': request.body.horario,
		'morada': request.body.morada,
		'cache': request.body.cache
	};
	modeloColab.updateSpeaker(data, function () {});


	response.json({
		success: "Updated Successfully",
		status: 200
		
	
	});







	









});




module.exports = router;