import express, { application, response } from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  fetchMoviePoster,
  fetchFavMoviePoster,
  addFavMovie,
} from "../controllers/MovieControllers.js";
import axios from "axios";

const router = express.Router();

// GET
router.get("/movies", (req, res) => {
  res.status(403).json({
    status: "error",
    message: "Forbidden",
  });
});
router.get("/movies/:title", fetchMoviePoster);
router.get("/movies/favorite", fetchFavMoviePoster);

// POST
router.post("/movies/favorite", addFavMovie);

export default router;
