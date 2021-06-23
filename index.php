<?php
     header('Content-Type: text/html; charset=utf-8');
     include_once("backend/conttroller.php");     //controller\conttroller.php
     $ctrl = Controller::GetCrtl();
     $ctrl->Action();
?>

<!DOCTYPE html>
<html lang="en">
    
    <?php include("html/head.html"); ?>

    <script>
        <?php
            if($ctrl->user != null){
                echo "let current_user = '".$ctrl->user->name."#".$ctrl->user->id."';";
            }
        ?>
        let jsCtrl = new controller();

    </script>

    <body>
        <header>
            <?php include("header.php"); ?>
        </header>

        <div class="container main">
            <?php
                $ctrl->Display();
            ?>
        </div>
                    
        <footer>
            <?php include("footer.php"); ?>
        </footer>

    </body>

</html>