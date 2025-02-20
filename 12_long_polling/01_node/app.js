import express from "express";

const app = express();

let clients = [];

// den her åbner en forbindelse og venter på et svar
app.get("/events/subscribe", (req, res) => {
    res.setHeader("Content-Type", "application/json"); // hvilken form for data sender vi
    res.setHeader("Cache-Control", "no-cache"); // beholder ikke noget cache
    res.setHeader("Connection", "keep-alive"); // holder den i live

    clients.push(res); // res er response

    req.on('close', () => {
        clients = clients.filter((clients) => clients !== res);
    });
});

// den her skal køres mindst en gang, før de andre får et svar
app.get("/events/publish", (req, res) => {
    const message = {data: "this is a new message"};

    clients.forEach((res) => {
        res.send(message);
    });

    clients = [];

    res.status(204).end();
});

const PORT = 8080;
app.listen(PORT, () => console.log("the server is running port:", PORT));
