import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "moviesdb",
  port: 3306,
};

const connection = await mysql.createConnection(config);

export default class MovieModel {
  static async getAll({ genre }) {
    const lowerGenre = genre ? genre.toLowerCase() : null;

    if (lowerGenre) {
      try {
        const [genres] = await connection.query(
          "SELECT * FROM genre WHERE LOWER(name) = ?",
          [lowerGenre]
        );
        const [moviesWithGenre] = await connection.query(
          `SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id, g.name as genre
           FROM movie m
           INNER JOIN movie_genres mg ON m.id = mg.movie_id
           INNER JOIN genre g ON g.id = mg.genre_id
           WHERE g.id = ?;`,
          [genres[0].id]
        );

        return moviesWithGenre;
      } catch (error) {
        return [];
      }
    } else {
      try {
        const movies =
          await connection.query(`SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(g.name SEPARATOR ', ') AS genres, 
	       BIN_TO_UUID(m.id) id
         FROM movie m
         INNER JOIN movie_genres mg ON m.id = mg.movie_id
         INNER JOIN genre g ON g.id = mg.genre_id
         GROUP BY m.id;`);
        return movies[0];
      } catch (error) {
        return [];
      }
    }
  }

  static async getById({ id }) {
    try {
      const movie = await connection.query(
        `SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(g.name SEPARATOR ', ') AS genres, 
        BIN_TO_UUID(m.id) id
        FROM movie m
        INNER JOIN movie_genres mg ON m.id = mg.movie_id
        INNER JOIN genre g ON g.id = mg.genre_id
        WHERE BIN_TO_UUID(m.id) = ?
        GROUP BY m.id;`,
        [id]
      );
      return movie[0];
    } catch (error) {
      return [];
    }
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      poster,
      rate,
    } = input;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    await connection.beginTransaction();
    try {
      await connection.query(
        `INSERT INTO movie (id,title, year, director, duration, poster, rate) 
         VALUES (UUID_TO_BIN(?),?,?,?,?,?,?);`,
        [uuid, title, year, director, duration, poster, rate]
      );

      // Usar for..of que permite el uso de async await
      for (const el of genreInput) {
        const [result] = await connection.query(
          "SELECT id, name FROM genre WHERE LOWER(name) = ?;",
          [el.toLowerCase()]
        );

        if (result.length > 0) {
          const genreId = result[0].id;

          await connection.query(
            "INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);",
            [uuid, genreId]
          );
        }
      }

      //Confirmar
      await connection.commit();

      const newMovie = await connection.query(
        `SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(g.name SEPARATOR ', ') AS genres, BIN_TO_UUID(m.id) id
        FROM movie m
        INNER JOIN movie_genres mg ON m.id = mg.movie_id
        INNER JOIN genre g ON g.id = mg.genre_id
        WHERE BIN_TO_UUID(m.id) = ?
        GROUP BY m.id;`,
        [uuid]
      );

      return newMovie[0];
    } catch (error) {
      await connection.rollback();
      return [];
    }
  }

  static async delete({ id }) {
    await connection.beginTransaction();
    try {
      const movie = await connection.query(
        "SELECT * FROM movie WHERE BIN_TO_UUID(id) = ?",
        [id]
      );

      if (movie[0].length === 0) {
        return false;
      }

      await connection.query(
        `DELETE FROM movie_genres WHERE BIN_TO_UUID(movie_id) = ? `,
        [id]
      );

      await connection.query(`DELETE FROM movie WHERE BIN_TO_UUID(id) = ?`, [
        id,
      ]);

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      return false;
    }
  }

  static async update({ id, input }) {
    const movie = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year,director,duration,poster,rate FROM movie WHERE BIN_TO_UUID(id) = ?`,
      [id]
    );

    if (movie[0].length === 0) {
      return false;
    }

    let movieData = movie[0][0];
    const updatedMovie = {
      ...movieData,
      ...input,
    };

    connection.beginTransaction();
    try {
      await connection.query(
        `UPDATE movie SET title = "?",
        year = ?, director = "?" WHERE BIN_TO_UUID(id) = ?`,
        [input.title, input.year, input.director, id]
      );
    } catch (error) {
      await connection.rollback();
      return false;
    }

    return updatedMovie;
  }

  static async changePage({ pag }) {
    const registrosPag = 1;

    const movies =
      await connection.query(`SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(g.name SEPARATOR ', ') AS genres, 
      BIN_TO_UUID(m.id) id
      FROM movie m
      INNER JOIN movie_genres mg ON m.id = mg.movie_id
      INNER JOIN genre g ON g.id = mg.genre_id
      GROUP BY m.id;`);

    const inicio = (pag - 1) * registrosPag;
    const fin = Math.min( (inicio + registrosPag), movies[0].length );

    const updatedMovies = movies[0].slice(inicio, fin);
    return updatedMovies;

  }
}
