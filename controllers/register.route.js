const express = require('express');
const router = express.Router();
const userModel = require('../models/register.model');
var nodemailer = require('nodemailer');
var GoogleAuth = require('google-auth-library');

var crypto = require("crypto");






router.post('/', function (request, response) {



    userModel.usernameExists(request.body.username, function (areValid) {
        if (areValid) {


            response.json({
                error: "Updated Successfully",
                status: 400
            });
        } else {


            userModel.emailExists(request.body.email, function (areValid) {
                if (areValid) {


                    response.json({
                        error: "erro na base de dados",
                        status: 450
                    });






                } else {
                    function h() {
                        //console.log(request.user);
                        //console.log(request.isAuthenticated.


                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'nortephotographyminho@gmail.com',
                                pass: 'gonca1234'
                            }
                        });


                        var mailOptions = {
                            from: 'nortephotographyminho@gmail.com',
                            to: request.body.email,
                            subject: 'Norte Photography Workshop',
                            html: '<h1>Norte Photography</h1>' + '<p>Olá ' + request.body.name + '!</p>' + '<p>Bem vindo à equipa Norte Photography, temos alguns dos melhores workshops em fotografia para si!</p>' + '<h2>As suas credenciais são: </h2>' + '<p>username: ' + request.body.username + '</p>' + '<p>Password: ' + request.body.password + '</p>' + '<h2>Visite-nos em: </h2>' + '<h2> </h2>'
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });


                    }
                    h();


















                    var data = {
                        'username': request.body.username,
                        'name': request.body.name,
                        'email': request.body.email,
                        'password': request.body.password,
                        'numero': request.body.numero
                    };
                    userModel.create(data, function () {});


                    request.login(request.body.username, function (err) {

                        response.json({
                            success: "Updated Successfully",
                            status: 200
                        });





                    });




                }
            });
        }
    });
});

/*  ------------------------------------------------------------------------------------------------------------------------- */



router.post('/alterar', function (request, response) {


console.log(request.body.password_new)

if (request.body.password_new){



    var data = {

        'name': request.body.name,
        'password': request.body.password_new,
        'telemovel': request.body.numero,
        'id': request.body.id_part
    };
    userModel.updateParticipantePass(data, function () {});


    request.login(request.body.username, function (err) {

        response.json({
            success: "Updated Successfully",
            status: 200
        });






    });


}else{



    var data = {

        'name': request.body.name,
       
        'password': request.body.password,
        'telemovel': request.body.numero,
        'id': request.body.id_part
    };
    userModel.updateParticipante(data, function () {});


    request.login(request.body.username, function (err) {

        response.json({
            success: "Updated Successfully",
            status: 200
        });






    });




}
});



router.post('/lost', function (request, response) {



    userModel.emailExists(request.body.emailLost, function (areValid) {
        if (areValid) {





            response.json({
                error: "erro na base de dados",
                status: 200
            });

            var id = crypto.randomBytes(20).toString('hex');
            var data = {

                'email': request.body.emailLost,
                'password': id

            };

            userModel.updateParticipanteLost(data, function () {});

            function h() {
                //console.log(request.user);
                //console.log(request.isAuthenticated.


                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'nortephotographyminho@gmail.com',
                        pass: 'gonca1234'
                    }
                });


                var mailOptions = {
                    from: 'nortephotographyminho@gmail.com',
                    to: request.body.emailLost,
                    subject: 'Norte Photography Workshop',
                    html: '<h1>Norte Photography</h1>' + '<p>Olá ' + request.body.name + '!</p>' + '<p>a sua password foi reposta com sucesso! </p>' + '<h2>As suas novas credenciais são: </h2>' + '<p>Password: ' + id + '</p>' + '<h2>Visite-nos em: </h2>' + '<h2> </h2>'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });


            }
            h();

        } else {
            response.json({
                error: "erro na base de dados",
                status: 450
            });





        }










    });
});

module.exports = router;