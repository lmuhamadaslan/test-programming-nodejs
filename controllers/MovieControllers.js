import axios from "axios";
import FavMovieSchema from "../models/FavMovieSchema.js";
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.API_KEY;

export const fetchMoviePoster = async (req, res) => {
  const { title } = req.params;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`
    );
    const { Poster } = response.data;
    res.status(200).json({
      status: "success",
      data: Poster,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const fetchFavMoviePoster = async (req, res) => {
  const { user_id } = req.user;
  try {
    const favMovies = await FavMovieSchema.findAll({
      where: {
        user_id,
      },
    });
    const favMoviesTitle = favMovies.map((movie) => movie.title);
    const favMoviesPoster = await Promise.all(
      favMoviesTitle.map(async (title) => {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`
        );
        const { Poster } = response.data;
        return Poster;
      })
    );
    res.status(200).json({
      status: "success",
      data: favMoviesPoster,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const addFavMovie = async (req, res) => {
  const { id } = req.user;
  const { title } = req.body;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`
    );
    const { Poster } = response.data;
    const newFavMovie = new FavMovieSchema({
      userId: id,
      title: Poster,
    });
    await newFavMovie.save();
    res.status(200).json({
      status: "success",
      message: "Movie added to favorite",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
