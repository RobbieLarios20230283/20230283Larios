
import express from "express";
import movieRoutes from "./src/Routes/movies.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/movie", movieRoutes);

export default app;
