import {WebSocket} from "ws";

const wsClient = new WebSocket("ws://localhost:8080");

wsClient.on("error", console.error);

wsClient.on("open", function open() {
    wsClient.send("something sended from client");

    wsClient.on("message", (message) => {
        console.log(`received message from the server: ${message}`);
    })
});

