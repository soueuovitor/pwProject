const express = require('express');
const router = express.Router();
const modelPatrocinadores = require('../models/patrocinadores.model');
const fs = require ('fs');
const formidable = require('formidable');



router.get('/', global.secure('admin'),function(request, response){
	modelPatrocinadores.listFeedback(function (feedback) {

	//console.log(request.user);
	//console.log(request.isAuthenticated());
    	modelPatrocinadores.listPatrocinadores(function(patrocinadores) {
		response.set("Content-Type", "text/html");
		response.render('./admin/patrocinadores', {
			arrayPatrocinadores: patrocinadores,
			feedback:feedback
		})
		})
	})	
});

router.post('/' ,  global.secure('admin'), function (request, response) {
	var form = new formidable.IncomingForm();
	var fields = request.fields;
	
    form.parse(request, function (err, fields, files) {
    
      var oldpath = files.logo.path;
      var newpath = './public/img/logos/' + fields.name+'.png';

      fs.rename(oldpath, newpath, function (err) {


	
	

		
		

	
		var data = {
			
			'name':fields.name,
		
			'valor': fields.valor 
		};
		modelPatrocinadores.createPatrocinio(data, function () {
			
			
		});
		response.redirect('patrocinadores')

							
			
			
	
		
	})
   
})


	
});

    
module.exports = router;