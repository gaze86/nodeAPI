import { MovieModel } from "../models/movie.js";
import moviesSchema from "../schemas/movies.js";

export class MovieController {
  static async getAll(req, res) {
    // Filtrar según param
    const { genre } = req.query;

    const movies = await MovieModel.getAll({ genre });
    // Qué es lo que renderiza
    res.json(movies);
  }

  static async getById(req, res) {
    // -> path-to-regexp :id -> elemento dinámico
    const { id } = req.params;

    const movie = await MovieModel.getById({ id });
    if (movie) return res.json(movie);

    res.status(404).json({ message: "Movie not Found" });
  }

  static async create(req, res) {
    const result = moviesSchema.validateMovie(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await MovieModel.create({ movie: result.data });
    res.status(201).json(newMovie);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const movieToDelete = MovieModel.delete({ id });

    if (movieToDelete) {
      return res.json({ message: "Movie deleted" });
    }
    return res.status(404).json({ message: "Movie not Found" });
  }

  static async update(req, res) {
    // Validate body
    const result = moviesSchema.validatePartialMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
  
    // Extract id
    const { id } = req.params;
    const movieToUpdate = await MovieModel.update({id, input: result.data});
  
    if (movieToUpdate === false){
      return res.status(404).json({ message: "Movie not Found" });
    }
    return res.json(movieToUpdate);
  }

  static async pagination(req, res){
 
    const { pag } = req.params;
    const updatedMovies = await MovieModel.changePage({pag});
    res.json(updatedMovies);
  }
}
