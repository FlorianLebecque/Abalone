class controller{
    constructor(){
        this.webSocket = new webSocketHandler();

        this.webSocket.websocket_server.onmessage = function(e){ 
            let params = JSON.parse(e.data);

            switch(params.responce){
                case "roomlist":
                    gotMyList(params.body);
                    break;
                case "EnterRoom":
                    RoomsRespond(params.body);
                    break;
                case "CreateRoom":
                    roomCreated(params.body);
                    break;
                case "PlayerJoined":
                    PlayerJoined(params.body);
                    break;

                case "PlayerLeaved":
                    PlayerLeaved(params.body);
                    break;
                
            }
        }

        console.log("ctrl loaded");
    }


    send(params) {
        return waitForSocketConnection(this.webSocket.websocket_server, function(){
            console.log("message sent!!!");
            jsCtrl.webSocket.websocket_server.send(JSON.stringify(params));
        },0);
    }


    GetRoomsList(){
        let data = {
            type    :   "request",
            msg     :   "roomlist"
        }

        return this.send(data);
    }

    EnterRooms(id){
        let data = {
            type    :   "request",
            msg     :   "EnterRoom",
            user    :   current_user,
            roomid  :   id
        }

        return this.send(data);
    }

    CreateRoom(){
        let data = {
            type    :   "request",
            msg     :   "CreateRoom"
        }

        return this.send(data);
    }

}

function waitForSocketConnection(socket, callback,nbr = 0){
    if(nbr > 100){
        console.log("No connection...")
        return 0;
    }
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null){
                    return callback();
                }
            } else {
                console.log("Wait for connection...")
                waitForSocketConnection(socket, callback,nbr + 1);
            }

    }, 5); // wait 5 milisecond for the connection...
}