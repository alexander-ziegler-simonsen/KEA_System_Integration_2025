import express from "express";
import { Person } from "./Person.js";
import { readFromFile, parseCsv, parseTxt, parseYaml, parseJson, parseXml } from "./masterPaser.js";

const app = express();
const PORT = 8080;
const serverB = "http://localhost:5267"; // remmember to point correctly

app.use(express.static("public"));

app.get("/xml", async (req, res) => {
    const response = await fetch(`${serverB}/xml-internal`);
    const raw = await response.text();
    const person = await parseXml(raw);
    res.json(person);
});

app.get("/json", async (req, res) => {
    const response = await fetch(`${serverB}/json-internal`);
    const raw = await response.text();
    const person = await parseJson(raw);
    res.json(person);
});

app.get("/yaml", async (req, res) => {
    const response = await fetch(`${serverB}/yaml-internal`);
    const raw = await response.text();
    const person = await parseYaml(raw);
    res.json(person);
});

app.get("/txt", async (req, res) => {
    const response = await fetch(`${serverB}/txt-internal`);
    const raw = await response.text();
    const person = await parseTxt(raw);
    res.json(person);
});

app.get("/csv", async (req, res) => {
    const response = await fetch(`${serverB}/csv-internal`);
    const raw = await response.text();

    const tempPath = "./data/me.csv";
    //fs.writeFileSync(tempPath, raw); // temporarily save it to disk ebecause our parsecsv takes a path
    const persons = await parseCsv(tempPath);
    // fs.unlinkSync(tempPath); // cleanup
    res.json(persons);
});

app.get("/xml-internal", async (req, res) => {
    const xml = await readFromFile("./data/me.xml");
    res.type("application/xml").send(xml);
});

app.get("/json-internal", async (req, res) => {
    const json = await readFromFile("./data/me.json");
    res.type("application/json").send(json);
});

app.get("/yaml-internal", async (req, res) => {
    const yaml = await readFromFile("./data/me.yaml");
    res.type("text/yaml").send(yaml);
});

app.get("/txt-internal", async (req, res) => {
    const txt = await readFromFile("./data/me.txt");
    res.type("text/plain").send(txt);
});

app.get("/csv-internal", async (req, res) => {
    const csvText = await readFromFile("./data/me.csv");
    res.type("text/csv").send(csvText);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});