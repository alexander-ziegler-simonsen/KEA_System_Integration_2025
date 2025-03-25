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

async function parseXml(fullFilePath) {
    return new Promise((resolve, reject) => {
        try{
            // read from file
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if(err) {
                    console.error(err);
                    reject(err);
                }
                let tempXmlParser = new XMLParser();


                // TODO - parseXml - fix this
                // the list of hobby is just a array and does not get converted to a list of hobby

                resolve(tempXmlParser.parse(data));
            })
        }
        catch (error) {
            console.log("something went wrong in 'parseXml'")
            console.error("error", error);
        }
    })
} 


async function parseJson(fullFilePath) {
    return new Promise((resolve, reject) => {
        try{
            // read from file
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if(err) {
                    console.error(err);
                    reject(err);
                }

                let obj = JSON.parse(data);
                // console.log(obj);
                
                resolve(obj);
            })
        }
        catch (error) {
            console.log("something went wrong in 'parseJson'")
            console.error("error", error);
        }
    })
} 

async function parseYaml(fullFilePath) {
    return new Promise((resolve, reject) => {
        try{
            // read from file
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if(err) {
                    console.error(err);
                    reject(err);
                }

                let yamlParser = YAML.parse(data);

                resolve(yamlParser);
            })
        }
        catch (error) {
            console.log("something went wrong in 'parseYaml'")
            console.error("error", error);
        }
    })
} 

async function parseTxt(fullFilePath) {
    return new Promise((resolve, reject) => {
        try{
            // read from file
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if(err) {
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
        try{       
            
                        
            // the list of objects
            let tempOutput = [];

            // reading stream
            fs.createReadStream(fullFilePath, {encoding: "UTF-8"}) 
            .pipe(CSV.parse({headers: true, quote: '"'}))
            .on('error', error => console.log(error))
            .on('data', data =>{
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

let xmlObj = await parseXml("./data/me.xml");
let jsonObj = await parseJson("./data/me.json");
let csvObj = await parseCsv("./data/me.csv");
let yamlObj = await parseYaml("./data/me.yaml");
let txtObj = await parseTxt("./data/me.txt");

console.log("xmlObj note ,", "type:", typeof(xmlObj), '\n', xmlObj["note"]);
console.log("hobbies:", xmlObj["note"]["hobbies"]);
console.log("------------------------------------------");

console.log("jsonObj", "type:", typeof(jsonObj), '\n', jsonObj);
console.log("------------------------------------------");

console.log("csvObj", ", type:", typeof(csvObj), '\n', csvObj);
console.log("csvObj just hobbies:", csvObj[0]["hobbies"]);
console.log("csvObj just hobbies:", csvObj[1]["hobbies"]);
console.log("------------------------------------------");

console.log("yamlObj", "type:", typeof(yamlObj), '\n', yamlObj);
console.log("just hobbies:", yamlObj["hobbies"])
console.log("------------------------------------------");

// TODO - make this one

console.log("txtObj", "type:", typeof(txtObj), 
console.log(txtObj.toString()));
console.log("------------------------------------------");

