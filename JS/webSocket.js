class webSocketHandler{
    constructor(){
        let host = window.location.hostname

        this.websocket_server = new WebSocket("ws://"+host+":5002/");

        this.websocket_server.onopen = function(e) {
            this.send(
                JSON.stringify({
                    'type':'socket',
                    'user_id':simId
                })
            );
        };

        this.websocket_server.onerror = function(e) {
            // Errorhandling
        }
    }
}

wb.websocket_server.onmessage = function(e){
                

    var json = JSON.parse(e.data);

    let data = json.msg.split('-')

    switch(json.type) {
        case 'chat':
        
            if(data[1]=="update"){
                
                return graphUpdater.update(data[0],graphMan)
            }else if (data[1]=="setDataset"){
                return graphUpdater.setDataset(data[0],graphMan)

            }else{
                return window[data[1]](data[0],param)
            }        
    }
}

wb.websocket_server.send(
    JSON.stringify({
        'type':'chat',
        'user_id':simId,
        'chat_msg':act+"-"+req+"-"+func.name
    })
);