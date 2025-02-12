// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 
// click on "MJS"
import fs from "fs";

// XML - parsering here

import { XMLValidator , XMLParser, XMLBuilder } from 'fast-xml-parser';
import Papa from 'papaparse';

async function readXmlFile(fullFilePath) {

    return new Promise((resolve, reject) => {
        try{
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  reject(err);
                }
                // console.log("data", data);
                // TODO
                resolve(data.toString());
              });
        } catch(error) {
            console.error("error", error);
        }
    })
}

async function readCsvFile(fullFilePath) {
    // promise is awaitable
    // is only done when "resolve" or "reject" are runned
    return new Promise((resolve, reject) => {
        try{
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  reject(err);
                }
                //console.log("data", data);
                resolve(data.toString());
              });
        } catch(error) {
            console.error("error", error);
            reject(error);
        }
    })
}

async function readJsonFile(fullFilePath) {
    return new Promise((resolve, reject) => {
        try{
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  reject(err);
                }
                // console.log("data", data);
    
                resolve(data.toString());
              });
        } catch(error) {
            console.error("readJsonFile error", error);
            reject(error);
        }
    })
}

async function parsingCsv(input) {
    return new Promise((resolve, reject) => {
        try {
            let output = Papa.parse(input, (e) => {
                //console.log("e", e);
            });
            console.log("csvParsing", output);

            // convert it to json data
            // TODO - make this cleaner
            let raw = output.data;
            
            resolve(raw);
        } catch (error) {
            console.log("parsingCsv error",error);
            reject(error);
        }
    })
}

async function parsingXml(input) {
    return new Promise((resolve, reject) => {
        try {
            console.log("input", input);
            const parser = new XMLParser();
      
            let jObj = parser.parse(input);
      
            const builder = new XMLBuilder();
            //const xmlContent = builder.build.apply(jObj);
      
            console.log(jObj);
      
            resolve(jObj);
          }
          catch (error) {
              console.error("parsingXml error",error);
              reject(error);
          }
    })
}

async function parsingJson(input) {
    return new Promise((resolve, reject) => {
        try{
            // test and check if it is a valid json
            let obj = JSON.parse(input);
            console.log(obj);
            resolve(obj);
        }catch(error) {
            console.log("parsingJson error",error);
            reject(error);
        }
    })
}


// xml 
let xmlData = await readXmlFile("./data/me.xml");
let xmlParsed = await parsingXml(xmlData);
console.log("xmlParsed",xmlParsed["note"]); // TODO - fix this shit
console.log("---------------------------------------------------------");

// json
let jsonData = await readJsonFile("./data/me.json");
let jsonParsed = await parsingJson(jsonData);
console.log("jsonParsed", jsonParsed);
console.log("---------------------------------------------------------");

// csv
let csvData = await readCsvFile('./data/me.csv');
let csvParsed = await parsingCsv(csvData);
console.log("csvParsed", csvParsed); 
console.log("---------------------------------------------------------");

