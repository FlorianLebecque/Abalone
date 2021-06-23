class controller{
    constructor(){
        this.webSocket = new webSocketHandler();

        this.webSocket.websocket_server.onmessage = function(e){ 
            let params = JSON.parse(e.data);

            switch(params.responce){
                case "roomlist":
                    gotMyList(params.body);
                    return "gelo";
                    
            }
        }

        console.log("ctrl loaded");
    }


    send(params) {
        return waitForSocketConnection(this.webSocket.websocket_server, function(){
            console.log("message sent!!!");
            jsCtrl.webSocket.websocket_server.send(JSON.stringify(params));
        });
    }


    GetRoomsList(){
        let data = {
            type    :'request',
            msg     :"roomlist"
        }

        return this.send(data);
    }


}

function waitForSocketConnection(socket, callback){
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null){
                    return callback();
                }
            } else {
                console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}