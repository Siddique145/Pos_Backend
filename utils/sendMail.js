const nodemailer = require("nodemailer");

const sendMail = (otp, email) => {
  try {
    const transport = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password Otp",
      html: `<div>${otp}</div>`,
    };

    transport.sendMail(mailOption, (error, info) => {
      if (error) {
        throw new Error("Failed to send Email");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = sendMail
