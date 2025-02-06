import express from 'express';

const app = express(); // nu har vi lavet en instance af express og gemt det som "app"
const PORT = 8080;

app.get("/", (req, res) => {
    res.send({ data: "root route" });
});

app.get("/greetings", (req, res) => {
    res.send({ data: "hello" });
})

app.listen(PORT, () => { console.log("server is running on port", PORT) }); 