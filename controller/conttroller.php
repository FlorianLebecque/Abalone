<?php
    session_start();

    class Controller {  

            //create a new controler
        public function __construct(){    

        } 

        public static function GetCrtl(){
            if(isset($_SESSION["crtl"])){
                return unserialize($_SESSION["crtl"]);
            }else{
                return new Controller();
            }
        }

        public function Display(){
            //display the correct page
            
        }

    }  
?>