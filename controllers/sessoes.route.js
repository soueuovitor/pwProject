const express = require('express');
const router = express.Router();
const modelPatrocinadores = require('../models/sessoes.model');
const fs = require('fs');
const formidable = require('formidable');



router.get('/', global.secure('admin'), function (request, response) {
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	modelPatrocinadores.listFeedback(function (feedback) {

	modelPatrocinadores.listSalas(function (salas) {
		modelPatrocinadores.listSpeakers(function (speakers) {
			modelPatrocinadores.listDias(function (dias) {
				modelPatrocinadores.listSessoes(function (sessoes) {

					response.set("Content-Type", "text/html");
					response.render('./admin/sessoes', {
						feedback:feedback,
						arraySessoes: sessoes,
						dias: dias,
						speakers: speakers,
						salas: salas
					})
				})
				})
			})

		})
	})
});

router.post('/', global.secure('admin'), function (request, response) {
	modelPatrocinadores.listSalas(function (salas) {
		modelPatrocinadores.listSpeakers(function (speakers) {
			modelPatrocinadores.listDias(function (dias) {
				modelPatrocinadores.listSessoes(function (sessoes) {
					
			
					var available = 0;
					var form = new formidable.IncomingForm();

					var fields = request.fields;
					form.parse(request, function (err, fields, files) {
							var caminho = new Date().getTime();


						var oldSmPath = files.sm.path;
						var newSmPath = './public/img/portfolio/' +caminho + '-sm.png';

						var oldpath = files.full.path;
						var newpath = './public/img/portfolio/' + caminho + '-full.png';




		var typeSm =  files.sm.type;
		var finalTypeSm = typeSm.split('/');

		

		var typeFull =  files.full.type;
		var finalTypeFull = typeFull.split('/');

		console.log(finalTypeSm[1] + ' '+ finalTypeFull[1])

	  if (finalTypeSm[1] != 'jpeg' && finalTypeSm[1] != 'png' && finalTypeSm[1] != 'jpg'){



		response.json({
			error: "erro na base de dados",
			status: 500
		});
	}else if (finalTypeFull[1] != 'jpeg' && finalTypeFull[1] != 'png'	&& finalTypeFull[1] != 'jpg') {





		response.json({
			error: "erro na base de dados",
			status: 550
		});


	}else{





						modelPatrocinadores.tittleExists(fields.titulo, function (areValid) {
							if (areValid) {


								response.json({
									error: "erro na base de dados",
									status: 450
								});






							} else {
								
								


								fs.rename(oldSmPath, newSmPath, function (err) {}),
									fs.rename(oldpath, newpath, function (err) {




									});


									var dt = new Date();



								 var c   = 	fields.data.split('/') ;
									
									
								var dt2 = parseInt(c[2]) + '-'+ parseInt(c[0])  + '-'+ parseInt(c[1]);
									
								if (fields.data.includes('/')){
								var data = {

									'titulo': fields.titulo,

									'desc_titulo': fields.desc_titulo,

									'texto_intro': fields.texto_intro,

									'descricao': fields.descricao,

									'categoria': fields.categoria,

									'inicio': fields.timepicker,
									'caminho': caminho,
								
									'fim': fields.timepicker2,


									'speaker': fields.speaker,

									'data': dt2,
									'sala': fields.sala
								};
								}else{
															var data = {

									'titulo': fields.titulo,

									'desc_titulo': fields.desc_titulo,

									'texto_intro': fields.texto_intro,

									'descricao': fields.descricao,

									'categoria': fields.categoria,

									'inicio': fields.timepicker,
									'caminho': caminho,
								
									'fim': fields.timepicker2,


									'speaker': fields.speaker,

									'data': fields.data,
									'sala': fields.sala
								};
								}

								/*
																var dt = new Date(); //current Date that gives us current Time also

																for (var d of dias) {
																	for (var s of sessoes) {
																		for (var e of salas) {


																			var startTime = s.hora_inicio;
																			var endTime = s.duracao;
																			var startTime2 = fields.timepicker;
																			var endTime2 = fields.timepicker2;

																			var ss = startTime.split(':');
																			var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
																				parseInt(ss[0]), parseInt(ss[1]));

																			var es = endTime.split(':');
																			var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
																				dt.getDate(), parseInt(es[0]), parseInt(es[1]));

																			var ds = startTime2.split(':');
																			var dt3 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
																				parseInt(ds[0]), parseInt(ds[1]));

																			var de = endTime2.split(':');
																			var dt4 = new Date(dt.getFullYear(), dt.getMonth(),
																				dt.getDate(), parseInt(de[0]), parseInt(de[1]));




																			if (s.data_sessao.toLocaleDateString() == fields.data && s.sala == fields.sala) {
																				if (dt3 >= dt1 && dt3 <= dt2 || dt4 >= dt1 && dt4 <= dt2 || dt3 < dt1 && dt4 > dt2 ) {

																					//	if (d.data.toLocaleDateString() == fields.data && hora_formatada == fields.timepicker && e.cod_sala == fields.sala) {



																					available++;
																				}

																			
																			} else {


																			}

																		}

																	}
																}

								*/
																console.log ('crap')
								modelPatrocinadores.horaExists(data, function (exists) {
									if (exists) {


										response.json({
											error: "erro na base de dados",
											status: 400
										});


									} else {
										modelPatrocinadores.createSessao(data, function () {});

										response.json({
											error: "erro na base de dados",
											status: 200


										});


									}




								});






							}
						})
					}
					})
				})
			})
		})
	})



});


module.exports = router;