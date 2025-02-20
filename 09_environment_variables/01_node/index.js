// 1 import dotenv from "dotenv";
import "dotenv/config" // 3

// 0 console.log(dotenv);
// 1 dotenv.config();

// console.log(process.env); 

// ------------

console.log(new Date()); // utc     standard: iso 8601

console.log(Date());

const danishDate = new Intl.DateTimeFormat("da-dk").format(date);
console.log(danishDate);

const americanDate = new Intl.DateTimeFormat("en-us").format(date);
console.log(americanDate);