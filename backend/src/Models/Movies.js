

import { Schema, model } from "mongoose";

const moviesSchema = new Schema(
  { 
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    director:{
      type:String
    },
    genre:{
      type:String
    },
    year:{
      type:Number
    },
    duration:{
      type:Number
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("movies", moviesSchema);
