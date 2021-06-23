jsCtrl.GetRoomsList();


function gotMyList(params){

    console.log(typeof(params))

    let ht = "";

    Object.values(params).forEach( element=> {

        let row = "<tr>"

        if(element.psw == ""){
            row += "<td>x</td>";
        }else{
            row += "<td>v</td>";
        }

        row += "<td>"+element.player[0].name+"</td>";

        if(element.player.count == 2){
            row += "<td>"+element.player[1]+"</td>";
            row += "<td>Full></td>";
        }else{
            row += "<td>Free</td>";
            row += "<td><a class='btn' href='index.php?a=join&id="+element.id+"'>Join</a></td>";
        }

        
        row += "</tr>";

        ht+=row;
    });

    $("#roomList").html(ht);

}