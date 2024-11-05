// // import { MovieModel } from "../models/movie.js"; -> Modelo local
//import MovieModel from "../models/mysql/movie.js"; -> Modelo mysql
import moviesSchema from "../schemas/movies.js";

export class MovieController {
  constructor({ MovieModel }) {
    this.MovieModel = MovieModel;
  }

  getAll = async (req, res) => {

    
    // Filtrar según param
    const { genre } = req.query;
    console.log(this.MovieModel);
    const movies = await this.MovieModel.getAll({ genre });
    // Qué es lo que renderiza
    res.json(movies);
  }

  getById = async (req, res) => {
    // -> path-to-regexp :id -> elemento dinámico
    const { id } = req.params;

    const movie = await this.MovieModel.getById({ id });
    if (movie) return res.json(movie);

    res.status(404).json({ message: "Movie not Found" });
  }

  create = async (req, res) => {
    const result = moviesSchema.validateMovie(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await this.MovieModel.create({ input: result.data });
    res.status(201).json(newMovie);
  }

  delete = async (req, res) => {
    const { id } = req.params;
    const movieToDelete = await this.MovieModel.delete({ id });

    if (movieToDelete) {
      return res.json({ message: "Movie deleted" });
    }
    return res.status(404).json({ message: "Movie not Found" });
  }

  update = async (req, res) => {
    // Validate body
    const result = moviesSchema.validatePartialMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    // Extract id
    const { id } = req.params;
    const movieToUpdate = await this.MovieModel.update({ id, input: result.data });

    if (movieToUpdate === false) {
      return res.status(404).json({ message: "Movie not Found" });
    }
    return res.json(movieToUpdate);
  }

  pagination = async (req, res) => {
    const { pag } = req.params;
    const updatedMovies = await this.MovieModel.changePage({ pag });
    res.json(updatedMovies);
  }
}
