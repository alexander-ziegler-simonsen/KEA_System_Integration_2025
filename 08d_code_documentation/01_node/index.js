import * as fs from "fs";
import csv from 'csv-parser'
import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser";
import YAML from "yaml";


/**
 * the Person class
 */
class Person {

    /**
     * create Person
     * @constructor
     * @param {string} nameInput
     * @param {number} ageInput
     * @param {Array<string>} hobbiesInput
     * 
     */
    constructor(nameInput, ageInput, hobbiesInput) {
        this.name = nameInput;
        this.age = ageInput;
        this.hobbies = hobbiesInput;
    }

    /**
     * print the whole person obj
     */
    displayPerson() {
        console.log(`name: ${this.name} , age: ${this.age} , hobbies: ${this.hobbies.toString()}`);
    }
}

/**
 * the function that reads from file
 * @param {string} path 
 * @returns string format of the file it reads
 */
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

/**
 * takes text and parse it as xml
 * @param {string} input 
 * @returns returns a person obj of the input
 */
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

/**
 * takes text and parse it as json
 * @param {string} input 
 * @returns returns a person obj of the input
 */
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

/**
 * takes text and parse it as yaml
 * @param {string} input 
 * @returns returns a person obj of the input
 */
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

/**
 * takes text and parse it as txt
 * @param {string} input 
 * @returns returns a person obj of the input
 */
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

/**
 * takes text and parse it as csv
 * @param {string} input 
 * @returns returns a person obj of the input
 */
async function parseCsv(fullPath){
    return new Promise((resolve, reject) => {
        const tempRows = [];

        try{
            fs.createReadStream(fullPath).pipe(
                csv()
            ).on('data', (row) => {
                tempRows.push(new Person(row.name, row.age, row.hobbies.split(";")));
            }).on('end', () => { 
                resolve(tempRows); // super vigtigt at "resolve" er inde i denne - fs.createReadStream - event listener
            })
        }
        catch(err) {
            console.log("error in 'parseCsv'");
            console.error(err);
            reject(err);
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
const csvPersons = await parseCsv("./data/me.csv");
for(var person of csvPersons) person.displayPerson();

console.log("------------------ txt ------------------------");
let txtObj = await readFromFile("./data/me.txt");
const txtPerson = await parseTxt(txtObj);
txtPerson.displayPerson();
