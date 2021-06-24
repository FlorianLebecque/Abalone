<?php
    //error handling;
?>

<div class="table-responsive">
    <h2>Rooms</h2>
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