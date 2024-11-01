
// process => obj global que da info y control sobre proceso actual de ejecucion


//Argumentos de entrada
console.log(process.argv); // -> Argumentos que recibe en la terminal

//Controlar proceso y su salida

// process.exit(1); // -> 0 👌 -> 1 😫

//Eventos del proceso

process.on('exit', () =>{
  //Limpiar los recursos
});

//Current working directory
process.cwd(); // -> Desde que carpeta ejecutamos este proceso

//platform
console.log(process.env.NODE_ENV);
