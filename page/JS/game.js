const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let game_id =  urlParams.get('r')

console.log(game_id)

jsCtrl.EnterRooms(game_id)


function RoomsRespond(params){
    console.log(params);
    if(params == 404 || params == "full"){
        window.location = "index.php";
    }

}