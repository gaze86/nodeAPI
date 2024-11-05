import crypto from "node:crypto";

// Leer el JSON en ESM recomendado por ahora
import { createRequire } from "node:module";
const require = createRequire(import.meta.url); // -> direccion del archivo actual
const movies = require("../movies.json"); // -> raiz a movies.json

export class MovieModel {
  
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLocaleLowerCase())
      );
    }
    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((item) => item.id === id);
    return movie;
  }

  static async create({ movie }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...movie,
    };

    //Esto no seria REST porque guardamos el estado de la aplicación en memoria
    movies.push(newMovie);
    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      return false;
    }

    movies.splice(movieIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    const updatedMovie = {
      ...movieIndex,
      ...input,
    };
    return updatedMovie;
  }

  static async changePage({pag}){
    const registrosPag = 3;
    const inicio = (pag - 1) * registrosPag;
    const fin = inicio + registrosPag;
  
    const updatedMovies = movies.slice(inicio, fin);
    return updatedMovies;
  }
}
