// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 
// click on "MJS"

// for file reading
import * as fs from "fs";

// https://csv.js.org/parse/
import { parse as newCsvParse } from "csv-parse";

// ctrl + left click (to see documentation)
import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser";

// ctrl + left click (to see documentation)
import YAML from "yaml";

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

async function parseTxt(input) {
    return new Promise((resolve, reject) => {
        try {
            let elements = input.split("\r\n");
            let output = new Person(
                elements[0].split("= ")[1], 
                elements[1].split("= ")[1],
                elements[2].split("= ")[1].split(", ")
            );
            resolve(output);
        }
        catch (error) {
            console.log("something went wrong in 'parseXml'")
            console.error("error", error);
            reject(error);
        }
    })
}

async function parseCsv(fullPath) {
    return new Promise((resolve, reject) => {
        try {


            // the list of objects
            let tempOutput = [];

            // https://csv.js.org/parse/examples/file_interaction/

            // Parse the CSV content
            //const records = newCsvParse(fullPath, { bom: true });

            // console.log(records.info);
            // console.log(records);

            fs.createReadStream(fullPath)
            .pipe(newCsvParse())
            .on('data', (data) => {tempOutput.push(data)});


            

            // // TODO - parse csv - fix this
            // // the array is not handled right, since they just get saved as string 

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

// console.log("------------------ csv ------------------------");
// let csvObj = await readFromFile("./data/me.csv");
// const csvPerson = await parseCsv("./data/me.csv");
// csvPerson.displayPerson()


console.log("------------------ txt ------------------------");
let txtObj = await readFromFile("./data/me.txt");
const txtPerson = await parseTxt(txtObj);
txtPerson.displayPerson();
