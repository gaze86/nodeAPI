import express from "express";

import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.use(express.json());
app.use(corsMiddleware());
app.disable("x-powered-by"); // Deshabilitar el header X-powered-by Express

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log(`Servidor a la escucha en http://localhost:${PORT}`);
});
