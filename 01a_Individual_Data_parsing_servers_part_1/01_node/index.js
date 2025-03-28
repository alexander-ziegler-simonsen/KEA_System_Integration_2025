// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 
// click on "MJS"

// for file reading
import fs from "fs";

// ctrl + left click (to see documentation)
//import * as CSV from "fast-csv";
import * as CSV from "@fast-csv/parse";
import { parse as csvParse } from "fast-csv";

import { parse as newCsvParse } from "csv-parse";

// ctrl + left click (to see documentation)
import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser";

// ctrl + left click (to see documentation)
import YAML from "yaml";

// import { XMLValidator , XMLParser, XMLBuilder } from 'fast-xml-parser';
// import Papa from 'papaparse';


class Person {
    constructor(nameInput, ageInput, hobbiesInput) {
        this.name = nameInput;
        this.age = ageInput;
        this.hobbies = hobbiesInput;
    }

    displayPerson() {
        console.log(`name: ${this.name} , age: ${this.age} , hobbies: ${this.hobbies.toString()}`);
    }
}

async function readFromFile(path) {
    return new Promise((resolve, reject) => {
        try {
            // read from file
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);
            })
        }
        catch (error) {
            console.log("something went wrong in 'parseXml'")
            console.error("error", error);
            reject(error);
        }
    })
}

async function parseXml(input) {
    return new Promise((resolve, reject) => {
        try {

            let tempXmlParser = new XMLParser();

            let data = tempXmlParser.parse(input);


            const output = new Person(data["note"].name,
                data.note.age,
                data.note.hobbies.hobby);
            resolve(output);
        }

        catch (error) {
            console.log("something went wrong in 'parseXml'")
            console.error("error", error);
            reject(error);
        }
    })
}


async function parseJson(input) {
    return new Promise((resolve, reject) => {
        try {

            let data = JSON.parse(input);

            let output = new Person(data.name, data.age, data.hobbies)

            resolve(output);
        }

        catch (error) {
            console.log("something went wrong in 'parseJson'")
            console.error("error", error);
        }
    })
}

async function parseYaml(input) {
    return new Promise((resolve, reject) => {
        try {

            let yamlParsedData = YAML.parse(input);
            let output = new Person(yamlParsedData.name, yamlParsedData.age, yamlParsedData.hobbies);
            resolve(output);
        }

        catch (error) {
            console.log("something went wrong in 'parseYaml'")
            console.error("error", error);
        }
    })
}

async function parseTxt(fullFilePath) {
    return new Promise((resolve, reject) => {
        try {
            // read from file
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }

                resolve(data.toString());
            })
        }
        catch (error) {
            console.log("something went wrong in 'parseXml'")
            console.error("error", error);
        }
    })
}

async function parseCsv(fullFilePath) {
    return new Promise((resolve, reject) => {
        try {


            // the list of objects
            let tempOutput = [];

            // reading stream
            fs.createReadStream(fullFilePath, { encoding: "UTF-8" })
                .pipe(CSV.parse({ headers: true, quote: '"' }))
                .on('error', error => console.log(error))
                .on('data', data => {
                    tempOutput.push(data);
                })
                .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

            // TODO - parse csv - fix this
            // the array is not handled right, since they just get saved as string 

            resolve(tempOutput);

        }
        catch (error) {
            console.log("something went wrong in 'parseCsv'")
            console.error("error", error);
            reject(error);
        }
    })
}




console.log("------------------ xml ------------------------");
let xmlObj = await readFromFile("./data/me.xml");
const xmlPerson = await parseXml(xmlObj);
xmlPerson.displayPerson();

console.log("------------------ json ------------------------");
let jsonObj = await readFromFile("./data/me.json");
const jsonPerson = await parseJson(jsonObj);
jsonPerson.displayPerson();

console.log("------------------ yaml ------------------------");
let yamlObj = await readFromFile("./data/me.yaml");
const yamlPerson = await parseYaml(yamlObj);
yamlPerson.displayPerson();

console.log("------------------ csv ------------------------");
let csvObj = await readFromFile("./data/me.csv");


console.log("------------------ txt ------------------------");
let txtObj = await readFromFile("./data/me.txt");

// console.log("xmlObj note ,", "type:", typeof(xmlObj), '\n', xmlObj["note"]);
// console.log("hobbies:", xmlObj["note"]["hobbies"]);
// console.log("------------------------------------------");

// console.log("jsonObj", "type:", typeof(jsonObj), '\n', jsonObj);
// console.log("------------------------------------------");

// console.log("csvObj", ", type:", typeof(csvObj), '\n', csvObj);
// console.log("csvObj just hobbies:", csvObj[0]["hobbies"]);
// console.log("csvObj just hobbies:", csvObj[1]["hobbies"]);
// console.log("------------------------------------------");

// console.log("yamlObj", "type:", typeof(yamlObj), '\n', yamlObj);
// console.log("just hobbies:", yamlObj["hobbies"])
// console.log("------------------------------------------");

// // TODO - make this one

// console.log("txtObj", "type:", typeof(txtObj),
// console.log(txtObj.toString()));
// console.log("------------------------------------------");

