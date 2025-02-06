const message = "hello world";

const encoded = btoa(message);

console.log(encoded); // man kan set det er base64, fordi den slutter af med ='

const decoded = atob(encoded);

console.log(decoded);