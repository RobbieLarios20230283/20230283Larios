import express from "express";
import multer from "multer";
import movieController from "../Controllers/moviesController.js";

const router = express.Router();

const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(movieController.getAllmovies)
  .post(upload.single("image"), movieController.createMovie);

export default router;
