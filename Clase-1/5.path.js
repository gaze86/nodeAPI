
//path 
const path = require('node:path');

//Barra separadora de carpetas segun SO
console.log(path.sep);

// Unir rutas con path.join
const filepath = path.join('.','content', 'subfolder', 'test.txt');
console.log(filepath);

//nombre del fichero
const base = path.basename('/temp/tavoFiles/password.txt');
console.log(base);

//extension del fichero
const ext = path.extname('/temp/tavoFiles/password.txt');
console.log(ext);

//directorio
const dirname = path.resolve();
console.log(dirname);
console.log(__filename)
