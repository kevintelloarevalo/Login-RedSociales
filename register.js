var config = {
    apiKey: "AIzaSyD1jMnG8BgHSqWTBORGw6209LWktsofIOI",
    authDomain: "loginsocialmedia-8f9b9.firebaseapp.com",
    projectId: "loginsocialmedia-8f9b9",
    storageBucket: "loginsocialmedia-8f9b9.appspot.com",
    messagingSenderId: "1074154782284",
    appId: "1:1074154782284:web:9ce5c2529cae2c73ac7ee9",
    measurementId: "G-8T3Y0NQ6N4"
};

firebase.initializeApp(config);
firebase.analytics();

var auth = firebase.auth();
document.getElementById('btnloging').addEventListener('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(function (result) {
        var user = result.user;
        console.log(result.user.providerData[0].displayName);//user_nom
        console.log(result.user.providerData[0].email);//user_correo
        console.log(result.user.providerData[0].photoURL);

        $.post("controller/ControladorUsuario.php?op=registrar",{usu_nom:result.user.providerData[0].displayName,usu_correo:result.user.providerData[0].email,usu_pass:123456},function(data){
            if(data==0){
                Swal.fire({
                    icon: 'success',
                    title: 'Aceptado!',
                    text: 'Registro Correcto',
                    confirmButtonText: `Ok`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open('http://localhost/RedesSocialesLogin&Registro/view/home/','_self');
                    }
                });
            }else{
                Swal.fire(
                    'Observacion!',
                    'Correo ya existe',
                    'question'
                );
            }
        });

    }).catch(function (error) {
        console.log(error);
    });
});


function init(){


}

$(document).ready(function(){  //TODAS LAS ALERTAS APAGADAS


});

$(document).on("click","#btnregistrar", function(){
    var usu_nom = $('#usu_nom').val();
    var usu_correo = $('#usu_correo').val();  // Traemos lo que recolecta el id del formulario
    var usu_pass = $('#usu_pass').val();  
    var usu_pass1 = $('#usu_pass1').val();  
    //ANTES DE MANDAR LA INFO AL CONTROLADOR
    //VEREMOS SI VIENE INFORMACIÓN O NO
    if (usu_nom=='' || usu_correo=='' || usu_pass==''){  //SI CORREO , PASSWORD || NOMBRE VIENEN VACIOS MOSTRAR ALERTAS

        Swal.fire(  //ALERTA CAMPOS VACIOS
            'ERROR',
            'Campos vacios',
            'error'
        );
        
    }else {// si HAY INFORMACION EN LOS CAMPOS
        
        if(usu_pass==usu_pass1){  // si las contraseñas coinciden
        //UTILIZAMOS AJAX PARA ENVIAR INFORMACIÓN
            $.post("controller/ControladorUsuario.php?op=registrar",{usu_nom:usu_nom, usu_correo:usu_correo,usu_pass:usu_pass},function(data){
                if(data==0){ // SI VIENE 0 ENTONCES ES QUE SE REGISTRA             
                    Swal.fire({  //ALERTA REGISTRO CORRECTO
                        icon: 'success',
                        title: 'Aceptado!',
                        text: 'Registro Correcto',
                        confirmButtonText: `Ok`,
                    }).then((result) => {   //REDIRECCIONA AL HOME
                        if (result.isConfirmed) {
                            window.open('http://localhost/RedesSocialesLogin&Registro/view/home/','_self');
                        }
                    });                   

                }else{   //ALERTA SI ESE CORREO YA EXISTE
                    Swal.fire(
                        'Obeservación',
                        'Usuario ya existente',
                        'question'
                    );
                      //MOSTRAMOS ALERTA
                }
            });

        }else{ //SI NO COINCIDEN LAS CONTRASEÑAS MOSTRAMOS ALERTA 
            
            Swal.fire(
                'ERROR',
                'Contraseñas incorrectas',
                'error'
            );
        }

    } 
    

});
