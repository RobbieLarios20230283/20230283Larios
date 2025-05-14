
const employeeController = {};
import employeeModel from "../Models/employee.js";

employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};

employeeController.createemployee = async (req, res) => {
  const { name,email,password,phone,address,position,hireDate,salary } = req.body;
  const newemployee= new employeeModel({ name,email,password,phone,address,position,hireDate,salary });
  await newemployee.save();
  res.json({ message: "employee save" });
};

// DELETE
employeeController.deleteemployee = async (req, res) => {
const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedemployee) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
employeeController.updateemployee = async (req, res) => {
  // Solicito todos los valores
  const { name,email,password,phone,address,position,hireDate,salary  } = req.body;
  // Actualizo
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
        name,email,password,phone,address,position,hireDate,salary 
    },
    { new: true }
  );
  res.json({ message: "employee update" });
};

export default employeeController;
