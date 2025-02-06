// encode and then decode

const data = "this string is text";

let text = btoa(data); // encode to base64

console.log(text);

console.log(atob(text)); // decode from base64