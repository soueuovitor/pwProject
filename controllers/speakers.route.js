const express = require('express');
const router = express.Router();
const modelSpeakers = require('../models/speakers.model');
const fs = require ('fs');
const formidable = require('formidable');




router.get('/', global.secure('admin'),function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modelSpeakers.listFeedback(function (feedback) {

    	modelSpeakers.listSpeakers(function(speakers) {
		response.set("Content-Type", "text/html");
		response.render('./admin/speakers', {
			arraySpeakers: speakers,
			feedback:feedback
		})
	})
	})	
});
	
router.post('/' , function (request, response) {



	var form = new formidable.IncomingForm();
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
      var oldpath = files.speaker.path;
	  var newpath = './public/img/speakers/' + fields.email+'.png';
	  
	  		

		var type =  files.speaker.type;
		var finalType = type.split('/');



	  if (finalType[1] != 'jpeg' && finalType[1] != 'png' && finalType[1] != 'jpg'){



		response.json({
			error: "erro na base de dados",
			status: 500
		});
	}else{
		
		
		           modelSpeakers.emailExists(fields.email, function (areValid) {
                if (areValid) {


                    response.json({
                        error: "erro na base de dados",
                        status: 450
                    });






                } else {
		
		
		
		

      fs.rename(oldpath, newpath, function (err) {
		
		

	
		var data = {
			
			'name': fields.name,
			'morada': fields.morada,
			'email': fields.email,
			'numero': fields.numero,
			'cache': fields.cache,
			'introducao': fields.introducao
		};
		modelSpeakers.createSpeakers(data, function () {});

		
			response.json({
				success: "Updated Successfully",
				status: 200
			});
		
		
		
	
	});
}
});
}
}); 
})
module.exports = router;