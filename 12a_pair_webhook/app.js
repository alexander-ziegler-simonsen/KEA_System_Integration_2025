import express from 'express';
import * as fs from "fs/promises";
// import fs from "node:fs";
import {format} from "date-fns";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/payment", (req, res) => {
    console.log('Received webhook request:', req.body.data);

    // write 
    fs.appendFile(
        "outputs.txt", "\n | " + 
        format(Date.now(), "dd.MM.yyyy - hh:mm:SSS") + 
        " | " + JSON.stringify(req.body), 
        (err) => {
            if (err) throw err;
        })

    res.status(200).send("webhoot received!");
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Server is running on port", PORT));