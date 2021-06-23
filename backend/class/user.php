<?php
    class user{
        public function __construct($name_){    
            $this->name = $name_;
            $this->id =  uniqid();
        }
    }

?>