import express from "express";
const router = express.Router();

import logoutController from "../Controllers/logoutController.js";

router.route("/").post(logoutController.logout);

export default router;
