// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 
// click on "MJS"
import fs from "fs";

// XML - parsering here

import { XMLValidator } from 'fast-xml-parser';

// read the content of the file
const xmlFileRawData = "";

fs.readFile('./data/me.xml', 'utf8', (err, rawData) => {
    if (err) throw err;
    console.log(err);
    
    console.log(rawData);
    // xmlFileRawData = rawData;
})

const dataXmlCheck = XMLValidator.validate(xmlFileRawData);

if (dataXmlCheck === true) {
    console.log('xml file is valid',  dataXmlCheck);
}
if (dataXmlCheck.err) {
    console.log('xml is invalid because of - ' + dataXmlCheck.err.msg);
}

// end of - XML - parsering here 