const fs = require("node:fs/promises"); //node con promesas


console.log("-----------Promises-----------");

console.log("Leyendo el primer archivo...");
fs.readFile('./archivo.txt', 'utf-8')
    .then(text => {
        console.log("Primer texto", text);
    });

console.log("Hacer cosas mientras se lee el primer archivo");

console.log("Leyendo el segundo archivo...");
fs.readFile('./archivo2.txt', 'utf-8')
    .then(text => console.log(text));
