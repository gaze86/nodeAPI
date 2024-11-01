const fs = require("node:fs");
const fs2 = require("node:fs/promises"); //node con promesas

//Leer un archivo
console.log("----------Síncrono-------");

console.log("Leyendo el primer archivo...");
const text = fs.readFileSync('./archivo.txt', 'utf-8');
console.log(text);

console.log("Leyendo el segundo archivo...");
const secondText = fs.readFileSync('./archivo2.txt', 'utf-8');
console.log(secondText);


console.log("-----------Asíncrono-----------");

console.log("Leyendo el primer archivo...");
fs.readFile('./archivo.txt', 'utf-8', (err,text) => {
    console.log(text);
});

console.log("Hacer cosas mientras se lee el primer archivo");

console.log("Leyendo el segundo archivo...");
fs.readFile('./archivo2.txt', 'utf-8', (err,text) => {
    console.log(text);
});
