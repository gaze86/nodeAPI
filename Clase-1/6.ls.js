// const fs = require('node:fs');
const fs = require('node:fs/promises');


// console.log("----------Asíncrono----------");
// fs.readdir('.', (err,files)=>{
//   if(err){
//     console.log('Error al leer el directorio: ', err)
//     return;
//   }

//   files.forEach(file =>{
//     console.log(file);
//   })
// });

console.log("--------------Promesas-------");
fs.readdir('.')
  .then(files => {
    files.forEach(file => {
      console.log(file)})
    })
  .catch(err => console.log(err));