import DataParser from "./MyModule.js";
import express from "express";

let dataParser = new DataParser();
//dataParser.readFromFile();


// instance of express
const app = express();

app.get("/expressData", (req, res) => {
    res.send({ data: "this is the data from express" });
});

app.get("/requestFastApiData", async (req, res) => {
    const response = fetch("http://127.0.0.1:8000/fastapiData");
    const result = await response.json();

    res.send({data: result.data});
})

app.get("names/:name", (req, res) => {
    console.log(req.params.name);
    res.send({data: `your name is ${req.params.name}`});
})


const PORT = 8080;
app.listen(PORT, () => console.log("server started om port", PORT));

