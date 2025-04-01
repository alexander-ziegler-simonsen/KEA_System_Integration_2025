import * as fs from "fs";
import csv from 'csv-parser'
import XMLParser from "fast-xml-parser";
import YAML from "yaml";

import Person from "./Person.js";

class DataParser {
    constructor(){
        
    }

    async readFromFile(path) {
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

    async parseXml(input) {
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

    async parseJson(input) {
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

    async parseYaml(input) {
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

    async parseTxt(input) {
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

    async parseCsv(fullPath) {
        return new Promise((resolve, reject) => {
            const tempRows = [];

            try {
                fs.createReadStream(fullPath).pipe(
                    csv()
                ).on('data', (row) => {
                    tempRows.push(new Person(row[1].name, row[1].age, row[1].hobbies.split(";")));
                }).on('end', () => {
                    // TODO - fix this program, so it can handle more than one item
                    let output = tempRows[0];

                    resolve(output); // super vigtigt at "resolve" er inde i denne - fs.createReadStream - event lindser
                })
            }
            catch (err) {
                console.log("error in 'parseCsv'");
                console.error(err);
                reject(err);
            }

        })
    }

}

export default DataParser;