const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let game_id =  urlParams.get('r')

console.log(game_id)

jsCtrl.EnterRooms(game_id)

let player_1 = "Blue";
let player_2 = "red"

let cur_game = [];
let your_turn = 1;
let state = 1;

function RoomsRespond(params){
    if(params == 404 || params == "full"){
        window.location = "index.php";
    }

    let count = 0;
    Object.values(params.players).forEach(player =>{

        if(count == 0){
            player_1 = player.name;
        }else{
            player_2 = player.name;
        }

        count++;
    });

    cur_game = params;

    if(player_1 == current_user.split("#")[0]){
        your_turn = 1
    }else{
        your_turn = 2
    }

    if(Object.keys(cur_game.players).length < 2){
        state = -1;
    }

}


function PlayerJoind(params){

}

function PlayerPlayed(params){
    
}