<?php
     header('Content-Type: text/html; charset=utf-8');
     include_once("controller/conttroller.php");     //controller\conttroller.php
     $crtl = Controller::GetCrtl();
?>

<!DOCTYPE html>
<html lang="en">
    
    <?php include("html/head.html"); ?>

    <body>
        <header>
            <?php include("header.php"); ?>
        </header>

        <div class="main">
            <?php
                $crtl->Display();
            ?>
        </div>
                    
        <footer>
            <?php include("footer.php"); ?>
        </footer>

    </body>

</html>