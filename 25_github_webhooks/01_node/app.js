import express from "express";

const app = express();

app.use(express.json());
//app.use(express.urlencoded)

app.post("/githubwebhookjson", (req, res) => {
    console.log(req.body);
    res.sendStatus(204); // we are sending to github, they don't care for response, so we will just pass a "204"
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Server is running on port ", PORT));


