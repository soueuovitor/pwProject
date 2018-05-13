/*!
 * Start Bootstrap - SB Admin 2 v3.3.7+1 (http://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */
$(function () {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function () {
        return this.href == url;
    }).addClass('active').parent();


    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});


function changeFormVol() {

    $('#vol-div').slideUp();
    $('#pago-div').slideDown();
};

function changeFormPago() {
    $('#pago-div').slideUp();
    $('#vol-div').slideDown();
};
$('.timepicker').wickedpicker();


//login shit
$(function () {

    var $formRegisterVol = $('#register-vol');
    var $formRegisterPago = $('#registar-pago');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch (this.id) {
            case "register-vol":
                var $lg_username = $('#register_username').val();
                var $lg_password = $('#register_password').val();
                var $lg_numero = $('#register_phonenumber').val();

                if ($lg_username == "ERROR") {
                    msgChange($('#div-voluntario-msg'), $('#icon-voluntario-msg'), $('#text-voluntario-msg'), "error", "glyphicon-remove", "Username ou password inválidos");
                } else if ($lg_username.length < 5) {
                    msgChange($('#div-voluntario-msg'), $('#icon-voluntario-msg'), $('#text-voluntario-msg'), "error", "glyphicon-remove", "O username tem de ter pelo menos 5 caracteres");
                } else if ($lg_username.length > 20) {
                    msgChange($('#div-voluntario-msg'), $('#icon-voluntario-msg'), $('#text-voluntario-msg'), "error", "glyphicon-remove", "O username não pode exceder os 20 caracteres");
                } else if ($lg_password.length < 8) {
                    msgChange($('#div-voluntario-msg'), $('#icon-voluntario-msg'), $('#text-voluntario-msg'), "error", "glyphicon-remove", "A password tem de ter pelo menos 8 caracteres");
                } else if ($lg_numero.length < 9) {
                    msgChange($('#div-voluntario-msg'), $('#icon-voluntario-msg'), $('#text-voluntario-msg'), "error", "glyphicon-remove", "Número inválido");
                } else if ($lg_numero.length > 13) {
                    msgChange($('#div-voluntario-msg'), $('#icon-voluntario-msg'), $('#text-voluntario-msg'), "error", "glyphicon-remove", "Número Inválido");


                } else {
                    var form2 = new FormData($("#register-vol")[0]);
                    
                   
                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/registerColab',
                        data: form2,
                        processData: false,
                        contentType: false,
                        success: function (valido) {

                            if (valido.status == 200) {

                                msgChange($('#div-voluntario-msg'), $('#icon-login-msg'), $('#text-voluntario-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                location.reload();




                            } else if (valido.status == 400) {

                                msgChange($('#div-voluntario-msg'), $('#icon-login-msg'), $('#text-voluntario-msg'), "error", "glyphicon-remove", "Username não disponível");


                            } else {

                                msgChange($('#div-voluntario-msg'), $('#icon-login-msg'), $('#text-voluntario-msg'), "error", "glyphicon-remove", "Email já registado");


                            }

                        }


                    });
                }

                return false;
                break;



            case "registar-pago":
                var $rg_username = $('#register_pago_username').val();
                var $rg_email = $('#register_pago_email').val();
                var $rg_password = $('#register_pago_password').val();
                var $rg_numero = $('#register_pago_numero').val();
                var $rg_nif = $('#colab_pago_nif').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else if ($rg_username.length < 5) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username tem de ter pelo menos 5 caracteres ");
                } else if ($rg_username.length > 20) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username não pode exceder os 20 caracteres");
                } else if ($rg_password.length < 8) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "A password tem que ter pelo menos 8 caracteres");
                } else if ($rg_numero.length < 9) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");
                } else if ($rg_numero.length > 15) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");
                } else if ($rg_nif.length < 9) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "NIF inválido");








                } else {


                    var form2 = new FormData($("#registar-pago")[0]);
            
                   


                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/registerColab/pago',
                        data: form2,
                        processData: false,
                        contentType: false,
                        success: function (valido) {
                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                location.reload();




                            } else if (valido.status == 400) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username não disponível");


                            } else {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado");


                            }

                        }


                    });
                }




                return false;
                break;

            case "register-patron":
                var $patron_name = $('#register_name_normal').val();
                var $patron_valor = $('#register_valor').val();
                if ($patron_name == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Login error");
                } else if ($lg_username.length < 3) {
					msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username deve ter no minimo 3 caracteres");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");

                    var form2 = new FormData($("#register-patron")[0]);


                    $.ajax({
                        url: '/patrocinadores',
                        method: "POST",
                        dataType: 'json',
                        data: form2,
                        processData: false,
                        contentType: false,
                        success: function (result) {
                            if (result.status == 450) {
    
                                msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Já existe um workshop com esse título!");
    
    
    
                            }else  if (result.status == 400) {
                                msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Já existe uma sessão a decorrer nessa sala no horário escolhido!");
    
    
    
    
                            } else {
    
                                window.location = '/sessoes';
    
    
    
                            }
                        }
                    });
                }
                

                return false;
                break;
            case "register-sessao":
               var timepickers = $('.timepicker').wickedpicker();
                var form3 = new FormData($("#register-sessao")[0]);


                $.ajax({
                    url: '/sessoes',
                    method: "POST",
                    dataType: 'json',
                    data: form3,
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        if (result.status == 450) {

                            msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Já existe um workshop com esse título!");



                        }else  if (result.status == 400) {
                            msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Já existe uma sessão a decorrer nessa sala no horário escolhido!");


                        }else  if (result.status == 500) {
                            msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Foto principal não é válida!");


                        }else  if (result.status == 550) {
                            msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Foto  thumbnail não é válida!");




                        


                        


                        } else {

                            window.location = '/sessoes';



                        }
                    }
                });

            



                return false;
                break;


                case "register-foto":

                 var form3 = new FormData($("#register-foto")[0]);
 
 
                 $.ajax({
                     url: '/galeria',
                     method: "POST",
                     dataType: 'json',
                     data: form3,
                     processData: false,
                     contentType: false,
                     success: function (result) {
                         if (result.status == 450) {
 
                             msgChange($('#div-registerSessao-msg'), $('#icon-register-msg'), $('#text-registerSessao-msg'), "error", "glyphicon-remove", "Já existe um workshop com esse título!");
 
 
 
                            }else  if (result.status == 500) {
                             alert('Por favor escolha um foto válida')
    
 
 
                         } else {
 
                             window.location = '/galeria';
 
 
 
                         }
                     }
                 });
 
             
 
 
 
                 return false;
                 break;
 
 
 

            case "register-speaker":

                var $speaker_name = $('#register_name').val();
                var $speaker_morada = $('#register_morada').val();
                var $speaker_email = $('#register_email').val();
                var $speaker_numero = $('#register_numero').val();
                var $speaker_salario = $('#register_salario').val();
                if ($speaker_name == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Login error");
                } else if ($speaker_name.length < 5) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username tem de ter pelo menos 5 caracteres ");
                 } else if ($speaker_name.length > 20) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username não pode exceder os 20 caracteres");
                } else if ($speaker_numero.length < 9) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");
                } else if ($speaker_numero.length > 15) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");


                } else {
                    var form2 = new FormData($("#register-speaker")[0]);
                    dataType: 'json',
                   
                  


                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/speakers',
                        data: form2,
                        processData: false,
                        contentType: false,
                        success: function (valido) {
                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                location.reload();




                            } else if (valido.status == 400) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username não disponível");


                            } else if (valido.status == 450) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado!");
                            } else if (valido.status == 500) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Por favor insira uma foto válida!");


                            } else {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado");


                            }

                        }


                    });
                }

                return false;
                break;

            case "alter-Patrocinador":


                $.ajax({
                    datatype: "JSON",
                    type: 'POST',
                    url: '/alterPatrocinador',
                    data: $('#alter-Patrocinador').serialize(),
                    success: function (valido) {
                        if (valido.status == 200) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                            window.location = '/patrocinadores';




                        } else if (valido.status == 400) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username não disponível");


                        } else {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado");


                        }

                    }


                });




                return false;
                break;





            case "register-dia":

                var $data = $('#novodia').val();
                if ($data == '') {

                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Introduza Uma Data");

                } else {
                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/workshop',
                        data: $('#register-dia').serialize(),
                        success: function (valido) {
                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                window.location = '/workshop';


                            }else{
                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Já existe um dia com essa data!!");



                            }
                        }




                    });

                }


                return false;
                break;

            case "workshop-nome":

                var $nome = $('#nome-workshop').val();
                if ($nome < 5) {

                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "O nome tem que conter pelo enos 5 carateres");

                } else {
                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/workshop/nome',
                        data: $('#workshop-nome').serialize(),
                        success: function (valido) {
                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                window.location = '/workshop';


                            }
                        }




                    });

                }


                return false;
                break;

          case "enviar-mail":

             
                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/feedback/enviar',
                        data: $('#enviar-mail').serialize(),
                         success: function (valido) {
                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                window.location = '/feedback';


                            }
                        }

                        
                    


        
                    });

                


                return false;
                break;

            case "workshop-preco":


                $.ajax({
                    datatype: "JSON",
                    type: 'POST',
                    url: '/workshop/preco',
                    data: $('#workshop-preco').serialize(),
                    success: function (valido) {
                        if (valido.status == 200) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                            window.location = '/workshop';


                        }
                    }




                });




                return false;
                break;


            case "workshop-salario":


                $.ajax({
                    datatype: "JSON",
                    type: 'POST',
                    url: '/workshop/salario',
                    data: $('#workshop-salario').serialize(),
                    success: function (valido) {
                        if (valido.status == 200) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                            window.location = '/workshop';


                        }
                    }




                });




                return false;
                break;

            case "workshop-ocupacao":


                $.ajax({
                    datatype: "JSON",
                    type: 'POST',
                    url: '/workshop/ocupacao',
                    data: $('#workshop-ocupacao').serialize(),
                    success: function (valido) {
                        if (valido.status == 200) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                            window.location = '/workshop';


                        }
                    }




                });




                return false;
                break;


            case "alter-vol":
                var $vol_username = $('#altervol_username').val();
                var $vol_numero = $('#altervol_numero').val();
                if ($vol_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else if ($vol_username.length < 5) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username tem de ter pelo menos 5 caracteres");
                } else if ($vol_username.length > 20) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username não pode exceder os 20 caracteres");
                } else if ($vol_numero.length < 9) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número inválido");
                } else if ($vol_numero.length > 13) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número Inválido");


                } else {



                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/alterColab',
                        data: $('#alter-vol').serialize(),
                        success: function (valido) {
                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                window.location = '/colab';




                            } else if (valido.status == 400) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "não disponível");


                            } else {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado");


                            }

                        }


                    });
                }



                return false;
                break;


            case "alter-speaker":
				var $speaker_name = $('#speakalt_name').val();
                var $speaker_numero = $('#speakalt_num').val();
                if ($speaker_name == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Login error");
                } else if ($speaker_name.length < 5) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username tem de ter pelo menos 5 caracteres ");
                } else if ($speaker_name.length > 20) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username não pode excerder os 20 caracteres ");
                } else if ($speaker_numero.length < 9) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");
                } else if ($speaker_numero.length > 15) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");


                } else {


                $.ajax({
                    datatype: "JSON",
                    type: 'POST',
                    url: '/alterSpeaker',
                    data: $('#alter-speaker').serialize(),
                    success: function (valido) {
                        if (valido.status == 200) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                            window.location = '/speakers';




                        } else if (valido.status == 400) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username não disponível");


                        } else {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado");


                        }

                    }


                });
				}
                return false;
                break;




            case "settings-form":



                $.ajax({
                    datatype: "JSON",
                    type: 'POST',
                    url: '/settings',
                    data: $('#settings-form').serialize(),
                    success: function (valido) {
                        if (valido.status == 200) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                            window.location = '/speakers';




                        } else if (valido.status == 400) {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username não disponível");


                        } else {

                            msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado");


                        }

                    }


                });

                return false;
                break;





            case "alter-pago":
                var $pago_username = $('#register_username').val();
                var $pago_email = $('#register_email').val();
                if ($pago_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
              
				} else {



                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/alterColab/pago',
                        data: $('#alter-pago').serialize(),
                        success: function (valido) {

                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                window.location = '/colab';




                            } else if (valido.status == 400) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username não disponível");


                            } else {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já registado");


                            }

                        }


                    });
                }




                return false;
                break;
            default:
                return false;
        }
        return false;
    });
















    $('#toggle-me').change(function () {


        if (this.checked) {
            modalAnimate($formRegisterPago, $formRegisterVol);


        } else {

            modalAnimate($formRegisterVol, $formRegisterPago);

        }



    });



    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({
                height: $newH
            }, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function () {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }
});
//--------------------------------------------end of login------------------------------------------------------//


function lucro() {


    var chart = new CanvasJS.Chart("donut-lucro", {

        animationEnabled: true,
        title: {
            fontWeight: "normal",
            text: lucroWork()
        },
        data: [{
            indexLabelFontSize: 16,

            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0\" €\"",
            indexLabel: "{label} {y}",
            dataPoints: [{
                

                    label: "Patrocínios",

                    y: totalDinheiroPatrocinadores(),
                    color: "#2196F3",

                },

                {

                    label: "Bilhetes",
                    y: dinheiro(),
                    color: "#2196F3",


                },
                {

                    label: "Speakers",
                    y:  totalDinheiroSpeakers(),
                    color: "#F44336"
                },


                {

                    label: "Colaboradores",
                    y: totalDinheiroColab(),
                    color: "#F44336"
                }


        

            ]
        }]
    });
    chart.render();

}





$(function () {
    if ($('body').is('.admin')) {
        start();
    }
});



/* ----------------------------------------------------------------------------------------------------- */


  function bilhetes2() {

 


    var chart = new CanvasJS.Chart("bars-participantes", {
        animationEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        fontFamily: "verdana",
      
        axisX:{
            labelFontSize: 16,
          },
        
        data: [{
            
            yValueFormatString: "##0\" Pessoa(s)\"",


            type: "column",
         
            dataPoints: [


                {

                    label: "Col. Voluntários",
                    y: colabVoluntarios(),
                    color: "#2196F3",

                },

                {

                    label: "Col. Pagos",
                    y: colabPagos(),
                    color: "#F44336"
                },
                {

                    label: "Speakers",
                    y: numSpeakers(),
                    color: "#039BE5", 
                },


                {

                    label: "Patrocinadores",
                    y: numPatrocinadores(),
                    color: "#757575",
                }


            ],

        }]

    });
    chart.render();

}



/*-----------------------------------calendar-------------------------------------------------------------------------------------------------------*/ 