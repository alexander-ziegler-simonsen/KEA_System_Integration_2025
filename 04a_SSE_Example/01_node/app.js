import express from "express";

// app er en instance af express - pt ikke startet op
const app = express();

// express kan host static filer (html, css, osv)
// her fortæller vi med : express.static("public") - at vores 'root' path er 'public'
// alt i denne folder bliver loadet  og hostet med express
app.use(express.static("public"));

// GET      endpoint       
app.get("/synchronizetime", (req, res) => {
    res.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
    });

    setInterval(() => {sendTimeToClient(res)}, 1000);
});


function sendTimeToClient(res) {
    const time = new Date().toISOString();
    //                       \n\n makes a new line
    res.write(`data: ${time} \n\n`); // skriver heletiden - hvis der står noget andet end "data" så virker det ikke
}

const PORT = Number(process.env.PORT) || 8080; // auto 8080, hvis der ikke er en 'PORT' .env værdi
app.listen(PORT, () => console.log("server is running on port", PORT)) ;


