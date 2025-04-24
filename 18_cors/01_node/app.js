import express from 'express';
const app = express();

import cors from 'cors';
//app.use(cors());

app.use((req, res, next) => {
    //res.send({data: new Date() });

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    next(); // hvis du har flere "timestamp", så tager den første match, next vil gå videre til næste match
})

app.get("/timestamp", (req, res) => {
    res.send({data: new Date() });
})

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => console.log("server is running on port", PORT));