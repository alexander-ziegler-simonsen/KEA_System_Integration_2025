import { WebSocket } from "ws";


let displayname = "";


async function setDisplayName() {
    return new Promise((resolve, reject) => {

        try {
            process.stdin.on("data", (data) => {
                // save                         remove new lines from input
                displayname = data.toString().replace(/(\r\n|\n|\r)/gm, "");

                if (displayname == "") {
                    reject(`error: '${displayname}' is not a useable display name`);
                }
                else {
                    resolve(displayname);
                }
            });
        }
        catch (error) {
            console.log("set display name error");
            console.error("displayname error", error);
            reject(error);
        }

    })

}

async function startChatting() {
    return new Promise((resolve, reject) => {

        try {
            const wsClient = new WebSocket("ws://localhost:8080");

            // if error
            wsClient.on("error", (err) => {
                console.error(err);
                reject("websocket error");
            });

            // when connected
            wsClient.on("open", function open() {
                // 
                wsClient.send(`FTCM-${displayname}`);
            });

            // message from server
            wsClient.on("message", (message) => {

                // remove tags from message
                let clean = `${message}`.replace("FTCM-", "");

                resolve(console.log(`${clean}`));
            });
        }
        catch (error) {
            console.log("start chatting error");
            console.error("chat error", error);
            reject("chat error");
        }

    });
}


// ask for a display name
console.log("---------------------------");
console.log("you are about to connect to a local chat server.");
console.log("please 'write' your display name in the terminal and click enter:");
console.log("---------------------------");

let namePromise = await setDisplayName();

// TODO - everything under here ,should be run if the displayname was sat to "" 
console.log("---------------------------");
console.log(`you should now be connected to the server as: ${displayname}`);
console.log("every input written in the terminal will be send to the chat server and all user connected to it.");
console.log("---------------------------");
let chatPromise = await startChatting();
