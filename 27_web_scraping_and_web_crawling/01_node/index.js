import fs from "fs";
import {load} from 'cheerio';

//const resoponse = await fetch("https://www.proshop.dk/Baerbar");
//const result = await resoponse.text();

//fs.writeFileSync("index.html", result);

//const page = await fs.readFileSync("index.html", "utf-8");
const page = await fs.readFileSync("index.html").toString();

// ul 
// id : products

// li
// class: site-productlist-item site-customerCenterCard position-relative
// has: product

// title - a tag
// class: site-product-link
// // h2 
// // has: product-display-name

// price - span
// class: site-currency-lg
 
const $ = load(page);

$("#products [product]").each((index, element) => {
    const name = $(element).find(".site-product-link").text();
    const price = $(element).find(".site-currency-lg").text();

    console.log("prices:" , price , " | ", " name: ", name.trim());
})
