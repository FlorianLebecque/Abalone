<?php
     header('Content-Type: text/html; charset=utf-8');
     include_once("backend/conttroller.php");     //controller\conttroller.php
     $crtl = Controller::GetCrtl();
     $crtl->Action();
?>

<!DOCTYPE html>
<html lang="en">
    
    <script>
        <?php
            if($crtl->user != null){
                echo "let user = '".$crtl->user->name."#".$crtl->user->id."'";
            }
        ?>
    </script>

    <?php include("html/head.html"); ?>

    <body>
        <header>
            <?php include("header.php"); ?>
        </header>

        <div class="container main">
            <?php
                $crtl->Display();
            ?>
        </div>
                    
        <footer>
            <?php include("footer.php"); ?>
        </footer>

    </body>

</html>