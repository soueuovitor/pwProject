(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 50)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });

    // Collapse the navbar when page is scrolled
    $(window).scroll(function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });

})(jQuery); // End of use strict

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//login shit
$(function () {

    var $formLogin = $('#login-form');
    var $formLoginCompra = $('#login-compra-form');
    var $formLost = $('#lost-form');
    var $formLostCompra = $('#lost-compra-form');
    var $formRegister = $('#register-form');
    var $formRegisterCompra = $('#register-compra-form');
    var $divForms = $('#div-forms');
    var $divFormsCompra = $('#div-forms-compra');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch (this.id) {
            case "login-form":

                var $lg_username = $('#login_username').val();
                var $lg_password = $('#login_password').val();
                if ($lg_username.length < 5) {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Username tem que ter pelo menos 5 caracteres");
                } else if ($lg_password.length < 6) {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Password Inválida");
                } else {


                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/login',
                        data: $('#login-form').serialize(),
                        success: function (valido) {

                            if (valido.status == 200) {

                                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Bem Vindo!");

                                window.location = '/';

                            } else {
                                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Username ou password inválidos");

                            }
                        }
                    });
                }
                return false;
                break;


            case "login-compra-form":
                var $lg_username = $('#login_username').val();
                var $lg_password = $('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");

                }
                return false;
                break;



            case "lost-form":

                $.ajax({
                    datatype: "JSON",
                    type: 'POST',
                    url: '/register/lost',
                    data: $('#lost-form').serialize(),
                    success: function (valido) {

                        if (valido.status == 200) {

                            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Bem Vindo!");

                            window.location = '/';

                        } else {
                            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Username ou password inválidos");

                        }
                    }
                });
                return false;
                break;
            case "change-form":





                var $password = $('#password_change').val();
                var $verify_password = $('#password_verify').val();


                if ($password) {


                    if ($password.length < 8) {
                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Nova Password tem que ter pelo menos 8 caracteres");
                    } else if ($verify_password != $password) {
                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Passwords não estão iguais");
                    } else {


                        $.ajax({

                            datatype: "JSON",
                            type: 'POST',
                            url: '/register/alterar',
                            data: $('#change-form').serialize(),
                            success: function (valido) {

                                if (valido.status == 200) {

                                    msgChange($('#div-settings-msg'), $('#icon-settings-msg'), $('#text-settings-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                    window.location = '/';




                                } else if (valido.status == 400) {

                                    msgChange($('#div-change-msg'), $('#icon-settings-msg'), $('#text-change-msg'), "error", "glyphicon-remove", "Username não disponível");


                                } else {

                                    msgChange($('#div-settings-msg'), $('#icon-settings-msg'), $('#text-settings-msg'), "error", "glyphicon-remove", "Email já registado");


                                }



                            }
                        });

                    }


                } else {




                    $.ajax({

                        datatype: "JSON",
                        type: 'POST',
                        url: '/register/alterar',
                        data: $('#change-form').serialize(),
                        success: function (valido) {

                            if (valido.status == 200) {

                                msgChange($('#div-settings-msg'), $('#icon-settings-msg'), $('#text-settings-msg'), "sucess", "glyphicon-ok", "Alterado com sucesso!");
                                window.location = '/';




                            } else if (valido.status == 400) {

                                msgChange($('#div-change-msg'), $('#icon-settings-msg'), $('#text-change-msg'), "error", "glyphicon-remove", "Username não disponível");


                            } else {

                                msgChange($('#div-settings-msg'), $('#icon-settings-msg'), $('#text-settings-msg'), "error", "glyphicon-remove", "Email já registado");


                            }



                        }
                    });

                }

                return false;
                break;
            case "modal-compra":

                if ($('#modal-compra .data:checked').length > 0) {

                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/comprarBilhete',
                        data: $('#modal-compra').serialize(),

                        success: function (valido) {
                            var c = valido.satus;
                            if (valido.status == 200) {

                                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Bem Vindo!");

                                window.location = '/';

                            } else {

                                msgChange($('#div-compra-msg'), $('#icon-login-msg'), $('#text-compra-msg'), "error", "glyphicon-remove", "Já so temos " + valido.status + " bilhetes disponíveis!");



                            }
                        }

                    });

                } else {
                    msgChange($('#div-compra-msg'), $('#icon-login-msg'), $('#text-compra-msg'), "error", "glyphicon-remove", "Por Favor Selecione Um Dia");



                }

                return false;
                break;




            case "register-form":
                var $rg_username = $('#register_username').val();
                var $rg_email = $('#register_email').val();
                var $rg_password = $('#register_password').val();
                var $rg_numero = $('#register_phonenumber').val();
                if ($rg_username.length < 5) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O username tem que ter pelo menos 8 caracteres");
                } else if ($rg_password.length < 8) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "A password tem que ter pelo menos 8 caracteres");
                } else if ($rg_numero.length < 9) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");
                } else if ($rg_numero.length > 13) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");








                } else {



                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/register',
                        data: $('#register-form').serialize(),
                        success: function (valido) {
                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Conta Criada!");


                                location.reload();




                            } else if (valido.status == 400) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username já existe");





                            } else {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já existe");




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


    $('#login_register_btn_compra').click(function () {
        modalAnimateCompra($formLoginCompra, $formRegisterCompra)
    });
    $('#login_register_btn').click(function () {
        modalAnimate($formLogin, $formRegister)
    });
    $('#register_login_btn').click(function () {
        modalAnimate($formRegister, $formLogin);
    });
    $('#register_login_btn_compra').click(function () {
        modalAnimateCompra($formRegisterCompra, $formLoginCompra);
    });
    $('#login_lost_btn').click(function () {
        modalAnimate($formLogin, $formLost);
    });
    $('#login_lost_btn_compra').click(function () {
        modalAnimateCompra($formLoginCompra, $formLostCompra);
    });
    $('#lost_login_btn').click(function () {
        modalAnimate($formLost, $formLogin);
    });
    $('#lost_login_btn_compra').click(function () {
        modalAnimateCompra($formLostCompra, $formLoginCompra);
    });
    $('#lost_register_btn').click(function () {
        modalAnimate($formLost, $formRegister);
    });
    $('#lost_register_btn_compra').click(function () {
        modalAnimateCompra($formLostCompra, $formRegisterCompra);
    });
    $('#register_lost_btn').click(function () {
        modalAnimate($formRegister, $formLost);
    });
    $('#register_lost_btn_compra').click(function () {
        modalAnimateCompra($formRegisterCompra, $formLostCompra);
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

    function modalAnimateCompra($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divFormsCompra.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divFormsCompra.animate({
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
    











var images = new Array('public/img/bw-city.jpg',
'public/img/felino.jpg', 'public/img/country-side.jpg');
doSlideshow();
var nextimage = 0;

function doSlideshow() {
if (nextimage >= images.length) {
    nextimage = 0;
}
$('.bg-light')
    .css('background-image', 'url("' + images[nextimage] + '")')
  
    .fadeIn(100, function () {
    

    });
    nextimage++;
    setTimeout(doSlideshow, 2000);

}











$('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
});
function management() {

    window.location = '/admin';
};

function logout() {
    window.location = '/logout';
};
function onSignIn(googleUser) {

    var id_token2 = googleUser.getAuthResponse().id_token;







    var profile = googleUser.getBasicProfile();
    var token = {
        'ID': profile.getId(),
        'nome': profile.getName(),
        'image': profile.getImageUrl(),
        'email': profile.getEmail(),
        'username': profile.getEmail(),


    }



    $.ajax({
        datatype: "JSON",
        type: 'POST',
        url: '/tokensignin',
        data: token,

        success: function (valido) {
            var c = valido.satus;
            if (valido.status == 250) {
                alert('Registo completo com sucesso, as suas credenciais foram enviadas para o seu email')

                window.location = '/';
            } else if (valido.status == 300) {
                alert('Google ID já registado, utilize as suas credenciais para fazer login');



            } else if (valido.status == 450) {

                alert('Esse email já foi registado, utilize as suas credenciais para fazer login');


            }
        }
    })

}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
//------------------------------------------------------------------------MAPS----------------------------------



$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

});


$("#totalBilhetes").change(function () {
    var preco =  $('#precoWork').text();
    var numero =      $('#totalBilhetes').val();   
    var total = preco * numero;
    var totalAn = 'Preço total: '+ total +'€';
    $('#precoTotal').text(totalAn);
});

function initMap() {


    var userPos = 0;


   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          userPos = pos;
      
  
     

     
    var userPosition = new google.maps.LatLng(userPos.lat, userPos.lng);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var workshop = new google.maps.LatLng(41.453092, -8.289195);
    var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
 

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 41.453092,
            lng: -8.289195
        },
        zoom: 17,
        mapTypeId: 'satellite'
    });
    directionsDisplay.setMap(map);
 
    calculateAndDisplayRoute(directionsService, directionsDisplay);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: userPosition,
            destination: workshop,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}, function() {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 41.453092,
            lng: -8.289195
        },
        zoom: 17,
        mapTypeId: 'satellite'
    });
    var marker = new google.maps.Marker({
        position: {
            lat: 41.453092,
            lng: -8.289195
        },
        map: map,
        title: 'Norte Photography'
    });

});

}

}