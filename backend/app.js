
import express from "express";
import movieRoutes from "./src/Routes/movies.js";
import employeeRoutes from "./src/Routes/employees.js"
import customersRoutes from "./src/Routes/customers.js";
import loginRoutes from "./src/Routes/login.js"
import logoutRoutes from "./src/Routes/logout.js"
import passwordRecoveryRoutes from "./src/Routes/passwordRecovery.js";
import registerCustomersRoutes from "./src/Routes/registerCustomers.js"
import registerEmployeeRoutes from "./src/Routes/registerEmployees.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/registerEmployee",registerEmployeeRoutes)
app.use("/api/passwordRecovery",passwordRecoveryRoutes)
app.use("/api/logout",logoutRoutes);
app.use("/api/login",loginRoutes);
app.use("/api/registerCustomers",registerCustomersRoutes)
app.use("/api/customers",customersRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/employee",employeeRoutes);

export default app;
