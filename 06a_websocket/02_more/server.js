// tools used
// https://www.npmjs.com/package/ws
// also looking at code from "14_websocket"

import {WebSocketServer} from "ws";


const server = new WebSocketServer({ port: 8080 })

server.on('connection', (ws) => {
    // server log - new client - new count
    console.log("a new client connected:", server.clients.size);

    // send message out to everyone on chat server
    ws.on("open", (data) => {
        
        // remove tags from message
        let clean = data.toString().replace("FTCM-", "");

        // tell everyone that a new user connected
        server.clients.forEach( (client) => {
            client.send(String(`| user '${clean}' join the chat room |`))
        })
    })

    
    // send error, if there was one
    ws.on('error', console.error);

    

    ws.on('message', (data) => {
        // server log - of the message send to us (from one of the clients)
        console.log(`server | chat | ${data}`);

        // TODO - add some kind of filter or blacklist check, before sending them out
        
        // send the message out to everyone
        server.clients.forEach( (client) => {
            client.send(String(`| chat | ${data}`))
        })
    })

    ws.on("close", () => {
        // server log, never seen by clients
        console.log("server | a client disconnected", server.clients.size);
    })
});


