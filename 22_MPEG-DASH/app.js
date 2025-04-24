import express from "express";
const app = express();

// here we tell express to use these folders
app.use(express.static("public"));
app.use(express.static("videos"));

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("server is running on port", PORT));

