const express = require('express');
const router = express.Router();
const usersModel = require('../models/login.model');

router.post('/valid', function (request, response) {


        request.login(request.body.username, function (err) {
            
            response.redirect('/');
        });


    }),





    router.post('/', function (request, response) {


        usersModel.areValidCredentials(request.body.username, request.body.password, function (areValid) {
            if (areValid) {
                //Create the login session

                request.login(request.body.username, function (err) {

                    response.json({
                        success: "Updated Successfully",
                        status: 200
                    });

                });
            } else {




                response.json({
                    error: "Updated Successfully",
                    status: 400
                });







            }
        });
    });


module.exports = router;