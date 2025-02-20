import express from "express";

const app = express();

// we defind our public folder as static
app.use(express.static("public"));

const randomNumbers = [1, 25, 574];


app.get("/randomnumbers", (req, res) => {
    res.send({ data: randomNumbers });
})

app.get("/simulatenewnumbers", (req, res) => {
    const newNumber = getRandomInt(0 , 100);
    randomNumbers.push(newNumber);

    res.send({data: newNumber });
});


const PORT = 8080;
app.listen(PORT, () => console.log("server is running port", PORT));

