
import Employee from "../Models/employee.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {

  const {
    name,email,password,phone,address,position,hireDate,salary,
    isVerified
  } = req.body;

  try {
    const existEmployee = await Employee.findOne({ email });
    if (existEmployee) {
      return res.json({ message: "Employee already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newEmployee = new Employee({
      
      name,email,password:passwordHash
      ,phone,address,position,hireDate,salary,isVerified
    });

    await newEmployee.save();

    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({ message: "Empleado registrado" });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ message: "Error al registrar empleado" });
  }
};

export default registerEmployeesController;
