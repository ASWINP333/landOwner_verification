import nodemailer from 'nodemailer';

const { HOST, SERVICE, MAIL_PORT, USER_EMAIL, USER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE, // Should be 'gmail'
  host: process.env.HOST, // Should be 'smtp.gmail.com'
  port: parseInt(process.env.MAIL_PORT, 10), // Should be 465
  secure: true, // Use SSL (required for port 465)
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export default transporter;
