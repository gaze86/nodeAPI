const os = require('node:os');

console.log("Nombre del sistema operativo", os.platform());
console.log("Versión del sistema operativo", os.release());
console.log("Arquitectura sistema operativo", os.arch());
console.log("Información del usuario",os.userInfo());

console.log(os.cpus());