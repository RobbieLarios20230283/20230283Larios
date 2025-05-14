
const customersController = {};
import customersModel from "../Models/customers.js";

customersController.getcustomers = async (req, res) => {
  const customers = await customersModel.find();
  res.json(customers);
};

customersController.createcustomers = async (req, res) => {
  const { name,email,password,phone,address } = req.body;
  const newcustomers = new customersModel({ name,email,password,phone,address});
  await newcustomers.save();
  res.json({ message: "customer save" });
};

customersController.deletecustomers = async (req, res) => {
const deletedcustomers = await customersModel.findByIdAndDelete(req.params.id);
  if (!deletedcustomers) {
    return res.status(404).json({ message: "customer dont find" });
  }
  res.json({ message: "customer deleted" });
};

customersController.updatecustomers = async (req, res) => {

  const { name,email,password,phone,address  } = req.body;

  await customersModel.findByIdAndUpdate(
    req.params.id,
    {
        name,email,password,phone,address
    },
    { new: true }
  );
  res.json({ message: "customer update" });
};

export default customersController;
