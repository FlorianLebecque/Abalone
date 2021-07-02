class webSocketHandler{
    constructor(){
        let host = window.location.hostname

        this.websocket_server = new WebSocket("ws://"+host+":5002/");

        this.websocket_server.onopen = function(e) {

            if(current_user != -1){
                this.send(
                    JSON.stringify({
                        'type':'socket',
                        user : current_user
                    })
                );
            }else{
                this.send(
                    JSON.stringify({
                        'type':'socket'
                    })
                );
            }

        };

        this.websocket_server.onerror = function(e) {
            // Errorhandling
        }
    }
}