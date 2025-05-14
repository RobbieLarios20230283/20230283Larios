

import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },

    password: {
      type: Date,
      require: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    position: {
      type: String,
      require: true,
    },
    hireDate: {
      type: String,
    },

    salary: {
      type: String,
      require: true,
    },

    isverify: {
      type: Boolean,
      require: true,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeeSchema);
