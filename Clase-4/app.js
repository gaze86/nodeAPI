import express from "express";

import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";

//import movies from "./movies.json" assert { type: "json" }; // -> No hacer

//Como leer JSON en ESModules
//import fs from 'node:fs';
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

const app = express();
app.use(express.json());
app.use(corsMiddleware());
app.disable("x-powered-by"); // Deshabilitar el header X-powered-by Express


// Todos los recursos que sean MOVIES se identifica con /movies

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log(`Servidor a la escucha en http://localhost:${PORT}`);
});
