const express = require('express');
const router = express.Router();
const modelColab = require('../models/galeria.model');
const fs = require ('fs');
const formidable = require('formidable');



router.get('/', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modelColab.listFeedback(function (feedback) {

	modelColab.readImagens(function (imagens) {
		response.set("Content-Type", "text/html");
		response.render('./admin/galeria', {
			imagens:imagens,
			feedback: feedback

	})
	})
})
});


router.post('/' ,  global.secure('admin'), function (request, response) {
	var form = new formidable.IncomingForm();
	var path = new Date().getTime();
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
      var oldpath = files.foto.path;
      var newpath = './public/img/galeria/' + path+ '.png';
      fs.rename(oldpath, newpath, function (err) {
		
		
		var type =  files.foto.type;
		var finalType = type.split('/');

		if (finalType[1] != 'jpeg' && finalType[1] != 'png' && finalType[1] != 'jpg'){
			response.json({
				error: "erro na base de dados",
				status: 500
			});
		}else{
		var data = {
			
			'name':fields.name,
		
			'path': path
		};
		modelColab.createFoto(data, function () {});
		response.json({
			success: "Updated Successfully",
			status: 200
			
		
		});
	
	
	
	}	
	})
})


	
});
router.get('/:caminho/delete', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modelColab.removePhoto(request.params.caminho, function (caminho) {
		response.redirect('/galeria');
	})
});





module.exports = router;