import express from 'express';

const app = express(); // nu har vi lavet en instance af express og gemt det som "app"
const PORT = 8084;

app.get("/", (req, res) => {
    res.send({ data: "#4 express server" });
});

app.get("/batman", (req, res) => {
    res.send({ data: "I AM ......" });
})

app.listen(PORT, () => { console.log("server is running on port", PORT) }); 