require('dotenv').config();
import nodemailer from 'nodemailer';

// Function to send email
export async function sendMail(email: string, subject: string, link: string,) {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.STMP_EMAIL,
      pass: process.env.STMP_PASS
    }
  });

  // Define the email options
  const mailOptions = {
    from: `${process.env.SMTP_EMAIL}`,
    to: `${email}`,
    subject: `${subject}`,
    text: `${link}`
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Mail sent successfully" };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: "Failed to send email", error: error };
  }
}