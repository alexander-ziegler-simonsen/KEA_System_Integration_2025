import express from 'express';

const app = express();
const PORT = 8081;

app.get("/", (req, res) => {
    res.send({data: "root route"});
});

app.use(express.static("public"));

app.listen(PORT, () => { console.log("server is running on port", PORT) }); 