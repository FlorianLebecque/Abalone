<?php
    session_start();

    include_once("class/user.php");

    class Controller {  

            //create a new controler
        public function __construct(){    
            $this->user = null;
        } 

            //get the controller from the session or create a new one
        public static function GetCrtl(){
            if(isset($_SESSION["crtl"])){
                return unserialize($_SESSION["crtl"]);
            }else{
                return new Controller();
            }
        }

            //do the action
        public function Action(){
            if(isset($_GET["a"])){
                $action = htmlspecialchars($_GET["a"]);

                switch($action){
                    case "login":
                        if($this->login()){
                            $_SESSION["crtl"] = serialize($this);
                            header("Location: index.php");
                        }else{
                            header("Location: index.php?p=login&err=1");
                        }
                        
                        break;
                    
                    case "logoff":
                        session_destroy();
                        header("Location: index.php");
                        break;

                    case "join":
                        if($this->user != null){
                            if(isset($_GET["id"])){
                                $id = htmlspecialchars($_GET["id"]);
                            }
                            header("Location: index.php?p=game&r=".$id);
                        }else{
                            header("Location: index.php?p=login");
                        }
                        
                        break;
                    

                }

            }

        }

        public function Display(){
            //display the correct page
            
            $this->page = "serverlist";

                //check if the user try to acces a page
            if(isset($_GET["p"])){
                switch($_GET["p"]){

                    case "login":
                        $this->page = "login";
                        break;

                    case "game":
                        $this->page = "game";
                        break;
                    default:
                        $this->page = "serverlist";
                }

            }

            $this->_display();
        }

        private function _display(){
            switch($this->page){
                case "game":
                    include("page/game.php");
                    break;
                case "serverlist":
                    include("page\server_list.php");
                    break;
                case "login":
                    include("page/login.php");
                    break;
            }

        }

        private function login(){
            if(isset($_POST["username"])){
                $username = htmlspecialchars($_POST["username"]);
                if($username != ""){
                    $this->user = new user($username);
                    return true;
                }
                
            }
            
            return false;
        }

    }  
?>