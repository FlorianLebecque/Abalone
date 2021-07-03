<?php
    class room{
        public function __construct($psw_) {
            $this->id       =  uniqid();
            $this->psw      = $psw_;
            $this->players  = array();
            $this->table    = array();
            $this->turn     = 1;    //player 1 or player 2
        }
        
    }
?>