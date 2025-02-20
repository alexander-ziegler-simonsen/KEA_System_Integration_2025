import express from "express";

const app = express();

app.use(express.static("public"));
// console.log(process.env.PORT);

app.get("/synchronizetime", (req, res) => {
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
    });

    setInterval(() => {sendTimeToClient(res)}, 1000);
});

// \n\n er hvad vi gerne vil slut data af med
function sendTimeToClient(res) {
    const time = new Date().toISOString();
    res.write(`data: ${time} \n\n`); // skriver heletiden, hvis der står noget andet end "data" så virker det ikke
}

const PORT = Number(process.env.PORT) || 8080; // nu kan det sættes af env værdier, eller defaulter til 8080
app.listen(PORT, () => console.log("server is running on port", PORT)) ;


