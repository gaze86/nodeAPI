//Imports

const express = require("express");
const dittoJson = require("./pokemon/ditto.json");

const app = express();
const PORT = process.env.PORT ?? 1234;

app.disable("x-powered-by");

app.use(express.json()); // -> Hace lo mismo que la función de abajo..

//Middleware
app.use((req, res, next) => {
  if(req.method !== "POST") return next();
  if(req.headers["content-type"] !== "application/json") return next();

  // Solo llegan las request que son POST y que el content type es application/json
  let body = "";

  //escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    // mutar la request y meter la info en el req.body
    req.body = data;

    next();
  });

});

app.get("/", (req, res) => {
  res.send("<h1>Mi página</h1>");
});

app.get("/pokemon/ditto", (req, res) => {
  res.json(dittoJson);
});

app.post("/pokemon", (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

//Server a la escucha
app.listen(PORT, () => {
  console.log(`El puerto es http://localhost:${PORT}`);
});
