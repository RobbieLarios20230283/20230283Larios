import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs"; 
import nodemailer from "nodemailer"; 
import crypto from "crypto"; 

import CustomerModel from "../Models/customers.js";
import { config } from "../config.js";

const registerCustomersController = {};

registerCustomersController.register = async (req, res) => {
  
  const {
    name,email,password,phone,address,isVerified
  } = req.body;

  try {
  
    const existsCustomers = await CustomerModel.findOne({ email });
    if (existsCustomers) {
      return res.json({ message: "Customer already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new CustomerModel({

      name,
      email,
      password : passwordHash,
      phone,
      address,
      isVerified: isVerified || false,
    });

    await newClient.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");

    const tokenCode = jsonwebtoken.sign(
  
      { email, verificationCode },
   
      config.JWT.secret,
     
      { expiresIn: "2h" }
    );

    res.cookie("VerificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });

    const mailOptions = {
      from: config.email.email_user,
      to: email,
      subject: "Verificación de correo",
      text: `Para verificar tu correo, utiliza el 
        siguiente código ${verificationCode}\n El codigo 
        vence en dos horas`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.json({ message: "Error" });

      console.log("Correo enviado" + info.response);
    });

    res.json({
      message: "Client registered. Please verify your email whit the code sent",
    });
  } catch (error) {
    res.json({ message: "Error" + error });
  }
};

registerCustomersController.verifyCodeEmail = async (req, res) => {
  const { verificationCode } = req.body;

  const token = req.cookies.VerificationToken;

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (verificationCode !== storedCode) {
      return res.json({ message: "Invalid code" });
    }

    const client = await CustomerModel.findOne({ email });
    client.isVerified = true;
    await client.save();

    res.json({ message: "Email verified successfull" });

    res.clearCookie("VerificationToken");
  } catch (error) {
    res.json({ message: "error" });
  }
};

export default registerCustomersController;
