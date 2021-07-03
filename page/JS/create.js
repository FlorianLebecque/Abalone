jsCtrl.CreateRoom()

function roomCreated(id){
    if(id != ""){
        console.log(id)
        window.location = "index.php?a=join&id="+id;
    }

}