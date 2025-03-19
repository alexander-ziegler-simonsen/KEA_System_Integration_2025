
// needed for websocket connections
import { WebSocket } from "ws";

const websocketClient =  new WebSocket("ws://localhost:8080");

websocketClient.on("open", () => {
    websocketClient.send("sending a client message from node.js");

   websocketClient.on("message", (message) => {
    console.log(`receives a message from the server: ${message}`);

    // websocketClient.close()
   } ); 
});
