<?php //ABRIMOS PHP
    session_start();
    
    class Conectar{
        protected $dbh; // variable protegida
        
        //creamos nuestra funcion conexion
        protected function conexion(){
            try {
                $conectar = $this->dbh = new PDO ("mysql:host=localhost:3307;dbname=registro","root","root");
                    //EDITAR SEGUN SU LOCALHOST
                return $conectar;

            } catch (Exception $e) {
				print "¡Error BD!: " . $e->getMessage() . "<br/>";
				die();
            }
        }
        public function set_names(){
            return $this->dbh->query("SET NAMES 'utf8'");
        }
        public function ruta(){
            return "http://localhost/RedesSocialesLogin&Registro/";
        }
    }
    
?>