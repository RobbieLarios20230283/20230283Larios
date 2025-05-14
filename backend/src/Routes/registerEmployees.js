import express from "express";
import registerEmployeesController from "../Controllers/employeeControllers";
const router = express.Router();

router.route("/").post(registerEmployeesController.register);

export default router;
