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
        alert("The room is full or hasn't been found");
        window.location = "index.php";
    }
    if(params == "started"){
        alert("The room has already stated");
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

function PlayerJoined(params){
    player_2 = params.name;
    state = 1;
}

function PlayerLeaved(params){
    player_2 = "Waiting for new player"
    player_1 = current_user.split("#")[0];
    your_turn = 1;
}

function sendGame(hex){
    jsCtrl.Played(convertHex(hex),game_id,cur_teamPlay)
}


/*
    Function witch convert
    the hexagone array into a
    int array
*/
function convertHex(hex){
    let int_array = [];
    hex.forEach(row => {
        let int_row = [];
        row.forEach(hexa =>{
            int_row.push(hexa.team);
        })
        int_array.push(int_row);
    })

    return int_array;
}

function updateHex(gameArray){
    let i = 0;
    hex.forEach(row => {
        let j = 0;
        row.forEach(hexa =>{
            hexa.team = gameArray[i][j];
            j++
        })
        i++;
    })
}

function PlayerPlayed(params){
    updateHex(params.gameArray)
    cur_teamPlay = params.turn
}