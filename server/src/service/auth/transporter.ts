import nodemailer from "nodemailer";
import { env } from "../../config/env";



// Create a transporter for SMTP
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
    },
});