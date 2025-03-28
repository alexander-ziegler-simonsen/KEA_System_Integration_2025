// tools used
// https://www.npmjs.com/package/ws
// also looking at code from "14_websocket"

import {WebSocketServer} from "ws";

const server = new WebSocketServer({ port: 8080 })

server.on('connection', (ws) => {
    console.log("a new client connected:", server.clients.size);
    
    // send error, if there was one
    ws.on('error', console.error);

    

    ws.on('message', (data) => {
        console.log('received: %s', data);

        server.clients.forEach( (client) => {
            client.send(String(data))
        })
    })

    ws.on("close", () => {
        console.log("a client disconnected", server.clients.size);
    })
});


