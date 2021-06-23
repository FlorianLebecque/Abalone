
<nav class="navbar">
    <div class="nav justify-contend-start">
        <a href="index.php" class="align-middle">
            <h1> Abalone </h1>
        </a>
    </div>
    
    <div class="nav justify-contend-start">
        <?php
            if($ctrl->user != null){
        ?>
            <p><?php echo $ctrl->user->name."#".$ctrl->user->id ?></p>
        <?php
            }else{
        ?>
            <p><?php echo _("No user connected") ?></p>
        <?php
            }
        ?>
    </div>
    
    <div class="nav justify-contend-end">

        <?php
            if($ctrl->user != null){
        ?>
            <a class="btn" href="index.php?a=logoff">Exit</a>
        <?php
            }else{
        ?>
            <a class="btn" href="index.php?p=login">Log In</a>
        <?php
            }
        ?>
    </div>

</nav>
