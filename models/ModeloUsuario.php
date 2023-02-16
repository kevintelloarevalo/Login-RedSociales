<?php  //ABRIMOS PHP
     
    
    class ModeloUsuario extends Conectar{  // la clase principal de conexion.php
        // ACCEDER LOGIN
        public function get_login($usu_correo, $usu_pass){
            
            $conectar = parent::conexion();
            parent::set_names();
            $sql="SELECT * FROM tm_usuario WHERE usu_correo=? AND usu_pass=?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $usu_correo);
            $sql->bindValue(2, $usu_pass);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }
        //ACCEDER LOGIN REDES SOCIALES
        public function get_login_social($usu_correo){
            $conectar = parent::conexion();
            parent::set_names();
            $sql="SELECT * FROM tm_usuario WHERE usu_correo=?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $usu_correo);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }
        // VER CORREO EN LA BDD SI EXISTE
        public function get_correo($usu_correo){
            
            $conectar = parent::conexion();
            parent::set_names();
            $sql="SELECT * FROM tm_usuario WHERE usu_correo = ? AND est = '1'";  //Query = Si correo enviado en el formulario esta en la bdd
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $usu_correo);
            $sql->execute();
            return $resultado=$sql->fetchAll();
        }
        //REGISTRAR USUARIO
        public function registro_usuario($usu_nombre, $usu_correo, $usu_pass){

            $conectar = parent::conexion();
            parent::set_names();
            $sql="INSERT INTO tm_usuario (id, usu_nom, usu_correo, usu_pass, est) VALUES (NULL,?,?,?,'1')";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1, $usu_nombre);  //ENLAZAMOS EL NOMBRE
            $sql->bindValue(2, $usu_correo); //ENLAZAMOS EL CORREO
            $sql->bindValue(3, $usu_pass); //ENLAZAMOS EL PASSWORD
            $sql->execute();
            return $resultado=$sql->fetchAll();

        }



    }

?>