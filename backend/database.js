import mongoose from "mongoose";

import { config } from "./src/config.js";

mongoose.connect(config.db.URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Awebo si se pudo WASAAAAAAAAAAAAA");
});

connection.on("disconnected", () => {
  console.log("no se pudo conectar");
});

connection.on("error", (error) => {
  console.log("error found" + error);
});