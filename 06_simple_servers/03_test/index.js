import express from 'express';

const app = express(); // nu har vi lavet en instance af express og gemt det som "app"
const PORT = 8083;

app.get("/", (req, res) => {
    res.send({ data: "secound express server" });
});

app.get("/superman", (req, res) => {
    res.send({ data: "not cool" });
})

app.listen(PORT, () => { console.log("server is running on port", PORT) }); 