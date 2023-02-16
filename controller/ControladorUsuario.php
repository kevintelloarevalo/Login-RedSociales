<?php  //ABRIMOS PHP
    require_once("../config/conexion.php");
    require_once("../models/ModeloUsuario.php");

    $usuario = new ModeloUsuario(); //objeto hacia el Modelo

    switch ($_GET["op"]) {
        //controlador login
        case "acceso":
            $datos=$usuario->get_login($_POST["usu_correo"],$_POST["usu_pass"]);
            if(is_array($datos)==true and count($datos)>0){ // PREGUNTAMOS SI LA VARIABLE DATOS TRAE INFORMACIÓN O NO
                echo "1";
            }else{
                echo "0";
            }
            break;
        // CONTROLADOR LOGIN CON RED SOCIAL
        case "accesosocial":
            $datos=$usuario->get_login_social($_POST["usu_correo"]);
            if(is_array($datos)==true and count($datos)>0){ // PREGUNTAMOS SI LA VARIABLE DATOS TRAE INFORMACIÓN O NO
                echo "1";
            }else{
                echo "0";
            }
            break;      
            
        //controlador registrar
        case "registrar":
            
            //Ver correo SI ya existe en LA BDD
            $datos = $usuario->get_correo($_POST["usu_correo"]);
            if(is_array($datos)==true and count($datos)>0){ // PREGUNTAMOS SI LA VARIABLE DATOS TRAE INFORMACIÓN O NO
                
                echo "1"; //SI EXISTE ESE CORREO

            }else{ //SINO TRAE INFO
            
                //Registrar usuario
                $usuario->registro_usuario($_POST["usu_nom"],$_POST["usu_correo"],$_POST["usu_pass"]);
                echo "0";
            }
            break;
  
    }

    
?>