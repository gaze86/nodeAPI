import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
import MovieModel from "../models/mysql/movie.js";

export const moviesRouter = Router();
const movieController = new MovieController( {MovieModel} );

moviesRouter.get("/", movieController.getAll);
moviesRouter.post("/", movieController.create);

moviesRouter.get("/:id", movieController.getById);
moviesRouter.patch("/:id", movieController.update);
moviesRouter.delete("/:id", movieController.delete);
moviesRouter.get("/page/:pag", movieController.pagination);
