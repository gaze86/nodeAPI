const http = require("node:http"); //Protocolo HTTP => extraido de node
const fs = require("node:fs");

// Cliente es un navegador
const desiredPort = process.env.PORT ?? 1234;

//Se crea una request para iniciar  el servidor
const processRequest = (req, res) => {

  res.setHeader("Content-Type", "text/html;charset=utf-8");
  if (req.url === "/") {     // -> / Raiz del programa

    res.statusCode = 200; //OK
    res.end("Bienvenido a la página de inicio");

  } else if (req.url === "/contacto") {

    res.statusCode = 200; //OK
    res.end("Contacto");

  } else if (req.url === "/img") {

    fs.readFile("img_bonita.jpg", (err, data) => {
      //console.log(data);
      if (err) {
        res.statusCode = 500;
        res.end("<h1>500 Internal Server Error</h1>");
      } else {
        res.setHeader("Content-Type", "image/jpg");
        res.end(data);
      }
    });
    
  } else {
    res.statusCode = 404; // No encontrado
    res.end("404-Recurso no encontardo");
  }
};

//Se crea el servidor
const server = http.createServer(processRequest);

// Servidor a la escucha
server.listen(desiredPort, () => {
  console.log(`El puerto es http://localhost:${desiredPort}`);
});
