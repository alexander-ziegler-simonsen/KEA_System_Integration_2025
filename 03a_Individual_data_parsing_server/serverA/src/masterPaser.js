import * as fs from "fs";
import csv from "csv-parser";
import YAML from "yaml";
import { Person } from "./Person.js";
import { XMLParser } from "fast-xml-parser";

export async function readFromFile(path) {
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

export async function parseXml(input) {
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


export async function parseJson(input) {
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

export async function parseYaml(input) {
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

export async function parseTxt(input) {
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

export async function parseCsv(fullPath){
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



// export async function readFromFile(path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, "utf-8", (err, data) => {
//             if (err) reject(err);
//             else resolve(data);
//         });
//     });
// }

// export async function parseXml(input) {
//     const parser = new XMLParser();
//     const data = parser.parse(input);
//     return new Person(data.note.name, parseInt(data.note.age), data.note.hobbies.hobby);
// }

// export async function parseJson(input) {
//     const data = JSON.parse(input);
//     return new Person(data.name, parseInt(data.age), data.hobbies);
// }

// export async function parseYaml(input) {
//     const data = YAML.parse(input);
//     return new Person(data.name, parseInt(data.age), data.hobbies);
// }

// export async function parseTxt(input) {
//     const lines = input.split("\r\n");
//     const name = lines[0].split("= ")[1];
//     const age = parseInt(lines[1].split("= ")[1]);
//     const hobbies = lines[2].split("= ")[1].split(", ");
//     return new Person(name, age, hobbies);
// }

// export async function parseCsv(path) {
//     return new Promise((resolve, reject) => {
//         const rows = [];
//         fs.createReadStream(path)
//             .pipe(csv())
//             .on("data", (row) => {
//                 rows.push(new Person(row.name, parseInt(row.age), row.hobbies.split(";")));
//             })
//             .on("end", () => resolve(rows))
//             .on("error", reject);
//     });
// }