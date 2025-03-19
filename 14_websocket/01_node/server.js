import { WebSocketServer } from "ws";


// hvis vi ikke har en port, så vil den default været 8080
const PORT = process.env.PORT ?? 8080;

const server = new WebSocketServer({port: PORT});

//server.on (connect, close, message)
//server.send
server.on("connection", (ws) => {
    // console.log("new connection - ws data:", ws);
    console.log("new connection:", server.clients.size);

    // when the server is on, it sends this message
    ws.on("message", (message) => {
        // this sends data buff format of the message text
        //console.log("received message from the client:", message)

        // this sends the right text in text format
        console.log(`received message from the client: ${message}`);

        server.clients.forEach( (client) => {
            client.send(String(message));
        })
    })

    ws.on("close", () => {
        console.log("client disconnected", server.clients.size);
    });
});
