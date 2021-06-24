<?php
    class room{
        public function __construct($user_,$psw_) {
            $this->id       =  uniqid();
            $this->psw      = $psw_;
            $this->player   = array($user_);
            $this->table    = array();
        }
    }
?>