var config = {
    apiKey: "AIzaSyDNH7sfMAOimiLGJKdj9AAwvSqLmzG9TLM",
    authDomain: "login-cd171.firebaseapp.com",
    projectId: "login-cd171",
    storageBucket: "login-cd171.appspot.com",
    messagingSenderId: "315261753650",
    appId: "1:315261753650:web:bdc9519fbb34eae74b1f2b",
    measurementId: "G-D1FW8L6F2B"
};

    // Initialize Firebase
    firebase.initializeApp(config);
    firebase.analytics();


    var auth = firebase.auth();
    document.getElementById('btnloging').addEventListener('click', function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
        .then(function (result) {
            var user = result.user;
    
            console.log(result.user.providerData[0].displayName);
            console.log(result.user.providerData[0].email);
            console.log(result.user.providerData[0].photoURL);
    
            $.post("controller/ControladorUsuario.php?op=accesosocial",{usu_correo:result.user.providerData[0].email},function(data){
                if(data==0){
                    $('#lblerror').hide();
                    $('#lblvacio').hide();
                    $('#lblregistro').show();
                }else{
                    window.open('http://localhost/RedesSocialesLogin&Registro/view/home/','_self');
                }
            });
        }).catch(function (error) {
            console.log(error);
        });
    });


function init(){


}

$(document).ready(function(){  //TODAS LAS ALERTAS APAGADAS
    $('#lblvacio').hide(); //ALERTA VACIA
    $('#lblerror').hide(); //ALERTA ERROR
    $('#lblregistro').hide(); //ALERTA REGISTRO
});

$(document).on("click","#btnlogin", function(){
    var usu_correo = $('#txtcorreo').val();  // Traemos lo que recolecta el id
    var usu_pass = $('#txtpass').val();  

    //ANTES DE MANDAR LA INFO AL CONTROLADOR
    //VEREMOS SI VIENE INFORMACIÓN O NO
    if (usu_correo=='' || usu_pass==''){  //SI CORREO & PASSWORD VIENEN VACIOS MOSTRAR ALERTAS
        //SHOW ES MOSTRAR
        //HIDE ES OCULTAR
        $('#lblvacio').show(); // MOSTRAR LA ALERTA CAMPOS VACIOS
        $('#lblerror').hide(); //ALERTA OCULTA ERROR
        $('#lblregistro').hide(); // ALERTA OCULTA REGISTRO
    }else{
        //UTILIZAMOS AJAX PARA ENVIAR INFORMACIÓN
        //PRIMERO SE PASA LA VARIABLE DEL CONTROLADOR $POST: AKI VA EL DEL FORMULARIO
        $.post("controller/ControladorUsuario.php?op=acceso",{usu_correo:usu_correo,usu_pass:usu_pass},function(data){
            if(data==0){ // SI ALGO ESTA MAL Y VIENE 0 MOSTRAR ALERTA
                $('#lblerror').show(); //ALERTA DE DATOS INCORRECTOS
                $('#lblvacio').hide(); //ALERTA OCULTA VACIO
            }else{
                window.open('http://localhost/RedesSocialesLogin&Registro/view/home/','_self');
            }
        });
    }

});
