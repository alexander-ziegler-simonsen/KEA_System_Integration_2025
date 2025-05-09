import express from 'express';
import { format } from "date-fns";
import { validationOfUnregister, validationOfRegister } from "./helper.js";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { JsonDB, Config } from 'node-json-db';

// express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new JsonDB(new Config("db", true, true, "/"));

const eventTypes = [
    "payment_received",
    "payment_processed",
    "invoice_processing",
    "invoice_completed",
];


const registeredWebhooks = {
    payment_received: [],
    payment_processed: [],
    invoice_processing: [],
    invoice_completed: []
};

db.getData("/webhook")
.then((res, err) => {
    Object.values(res).forEach(value => {

        let tempWebhook = { id: value.id, webhook_url: value.webhook_url, events: value.events, registerTime: value.registerTime }

        value.events.forEach(async element => {
            registeredWebhooks[element].push(tempWebhook);
        });
    });
})
.catch((err) => {
    console.log("no data to load, first time calling this script...");
})


// register
app.post("/register-webhook/", async (req, res) => {
    console.log('webhook', req.body);


    // validation of the sended data
    let check = validationOfRegister(req.body);
    console.log("check", check);

    if (check) // send back the id and save them in the list
    {
        let userUuid = uuidv4();
        let tempWebhook = { id: userUuid, webhook_url: req.body.webhook_url, events: req.body.events, registerTime: format(Date.now(), "dd.MM.yyyy - hh:mm:SSS") }

        req.body.events.forEach(async element => {
            registeredWebhooks[element].push(tempWebhook);
        });
        await db.push(`/webhook/${userUuid}`, tempWebhook);

        let output = `webhook received!
        You are now registered on the events you listed in the post call. this is your id: ${userUuid}
        It is needed to unregister from the webhooks (you can see it again by calling '/ping' )`;

        res.status(200).send(output);
    }
    else {
        res.status(400).send("bad request, read the documentation ones more");
    }
})

app.post("/unregister-webhook/", async (req, res) => {

    let check = validationOfUnregister(req.body, registeredWebhooks);

    if (check) {
        let listOfWebhooksToRemove = [];
        req.body.events.forEach(element => {
            let index = 0;
            registeredWebhooks[element].forEach(user => {
                if (user.id == req.body.id)
                    listOfWebhooksToRemove.push([element, index, user.id]);

                index++;
            });
        });

        listOfWebhooksToRemove.forEach(async element => {
            registeredWebhooks[element[0]].splice(element[1]);
            
            const saved = await db.getData(`/webhook/${element[2]}`);

            if(saved.events.length > 1)
            {
                // TODO - try and catch - if index can't be found
                const indexToDelete = saved.events.indexOf(element[0]);
                saved.events.splice(indexToDelete, 1);
                await db.push(`/webhook/${element[2]}`, saved, true);
            }
            else {
                await db.delete(`/webhook/${element[2]}`)
            }
        });

        res.status(200).send("you have unregistered your webhooks on the following events: " + req.body.events);

    }
    else
        res.status(400).send("bad request or problems with id!");
})

// ping
app.post("/ping/", async (req, res) => {

    res.status(200).send("ping reqest send out to all register users!");
    console.log("ping request sended out to all");

    for (const key in registeredWebhooks) {
        registeredWebhooks[key].forEach(async user => {
            const pingPayload = {
                success: true, eventType: key, id: user.id, message: `someone have send out a 'pingAll' call... hello to you xD`
            };

            await axios.post(user.webhook_url, pingPayload);
        });
    }
})


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);

    let indexer = 0;

    setInterval(() => {
        // make random calls
        if (registeredWebhooks.payment_received.length > 0 ||
            registeredWebhooks.payment_processed.length > 0 ||
            registeredWebhooks.invoice_processing.length > 0 ||
            registeredWebhooks.invoice_completed.length > 0) {
            
            if (indexer >= 20) // every X secs, we overwrite our local data
            {
                //TODO - save to file, with helper functions
                indexer = 0;
            }

            eventTypes.forEach(element => {
                setTimeout(() => {
                    registeredWebhooks[element].forEach(async hook => {
                        await axios.post(hook.webhook_url, { id: hook.id, event: element, message: `webhook with id: ${hook.id} compelete at ${format(Date.now(), "dd.MM.yyyy - hh:mm:SSS")}` })
                    })
                }, Math.floor(Math.random() * (12000 - 3000 + 1)) + 3000)
            });

            indexer++;
        }
    }, 13000);
});

