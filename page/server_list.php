<?php
    //error handling;
?>

<div class="table-responsive">
    <h2>
        Rooms 
        <a class="btn" href="index.php?p=create">+</a>
        <a class="btn" onclick="jsCtrl.GetRoomsList();">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--secondary)" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
        </a>
    </h2>
    <hr>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--secondary)" class="bi bi-lock" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                    </svg>
                </th>
                <th scope="col-2">Player 1</th>
                <th scope="col-2">Player 2</th>
                <th scope="col">Go</th>
            </tr>
        </thead>
        <tbody id="roomList">
            
        </tbody>
    </table>
</div>


<script src="page/JS/server_list.js"></script>