const express = require('express');
const router = express.Router();
const model = require('../models/admin.model');

router.get('/', global.secure('admin'), function(request, response) {
  //console.log(request.user);
  //console.log(request.isAuthenticated.
  model.listSessoes(function(sessoes) {
    model.listFeedback(function(feedback) {
      model.listSpeakers(function(speakers) {
        model.listPatrocinadores(function(patrocinadores) {
          model.listColaboradores(function(colaboradores) {
            model.workshop(function(workshop) {
              model.listDias(function(dias) {
                model.listParticipantes(function(participantes) {
                  model.list(function(bilhetes) {
                    response.set("Content-Type", "text/html");
                    response.render('./admin/admin', {
                      numBilhetes: bilhetes,
                      numParticipantes: participantes,
                      numDias: dias,
                      workshop: workshop,
                      colaboradores: colaboradores,
                      patrocinadores: patrocinadores,
                      sessoes: sessoes,
                      feedback: feedback,
                      speakers: speakers
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

});








module.exports = router;
