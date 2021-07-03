jsCtrl.GetRoomsList();


function gotMyList(params){

    let ht = "";

    Object.values(params).forEach( element=> {

        let row = "<tr>"

        if(element.psw == ""){
            row += "<td>x</td>";
        }else{
            row += "<td>v</td>";
        }

        if(Object.values(element.players).length == 2){
            Object.values(element.players).forEach(player =>{
                row += "<td>"+player.name+"</td>";
            });
            row += "<td><a class='btn'>Full</a></td>";
        }else{
            row += "<td>"+Object.values(element.players)[0].name+"</td>";
            row += "<td>Free</td>";
            row += "<td><a class='btn' href='index.php?a=join&id="+element.id+"'>Join</a></td>";
        }

        
        row += "</tr>";

        ht+=row;
    });

    $("#roomList").html(ht);

}