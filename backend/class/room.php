<?php
    class room{
        public function __construct($user_,$psw_) {
            $this->id       =  uniqid();
            $this->psw      = $psw_;
            $this->players  = array(
                $user_->id => $user_
            );
            $this->table    = array();
            $this->turn     = 1;    //player 1 or player 2
        }
    }
?>