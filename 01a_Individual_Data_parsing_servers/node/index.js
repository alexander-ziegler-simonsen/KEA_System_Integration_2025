// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 
// click on "MJS"
import fs from "fs";

// XML - parsering here

import { XMLValidator , XMLParser, XMLBuilder } from 'fast-xml-parser';

async function readXmlFile(fullFilePath) {
    try{
        fs.readFile(fullFilePath, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("data", data);

            // fix this shit later, this is just so fucking bad code

            parsingXml(data);

            return data.toString();
          });
    } catch(error) {
        console.error("error", error);
    }
}

async function parsingXml(input) {
    console.log("input", input);
      const parser = new XMLParser();

      let jObj = parser.parse(input);

      const builder = new XMLBuilder();
      //const xmlContent = builder.build.apply(jObj);

      console.log(jObj);

      return jObj;
}
// console.log(parsingXml(readFile('./data/me.xml')));
let output = await readXmlFile('./data/me.xml');

