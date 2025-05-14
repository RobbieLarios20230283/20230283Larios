import nodemailer from "nodemailer"; 
import { config } from "../config.js";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"30 porcent activity" <robbieavellana@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.log("Error sending email");
  }
};

const HTMLRecoveryEmail = (code) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Account Recovery</h1>
      </div>
      
      <div style="padding: 30px;">
        <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 25px;">
          Hello, we received a request to reset your password. Please use the following verification code:
        </p>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin: 25px 0; text-align: center; border: 1px dashed #e0e0e0;">
          <span style="font-size: 28px; font-weight: 700; letter-spacing: 2px; color: #333; font-family: monospace;">
            ${code}
          </span>
        </div>
        
        <p style="font-size: 14px; color: #777; line-height: 1.6;">
          <strong>Note:</strong> This code will expire in 15 minutes. For security reasons, please do not share this code with anyone.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="font-size: 13px; color: #999; margin-bottom: 5px;">Didn't request this?</p>
          <p style="font-size: 13px; color: #999; margin: 0;">
            Ignore this email or contact our support team at 
            <a href="mailto:support@example.com" style="color: #667eea; text-decoration: none;">support@example.com</a> 
            if you have any concerns.
          </p>
        </div>
      </div>
      
      <div style="background: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </div>
  `;
};

export { sendEmail, HTMLRecoveryEmail };
