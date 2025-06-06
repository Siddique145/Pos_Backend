// const nodemailer = require("nodemailer");

// const sendMail = (otp, email) => {
//   try {
//     const transport = nodemailer.createTransport({
//       service: "GMAIL",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOption = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Reset Password Otp",
//       html: `<div>${otp}</div>`,
//     };

//     transport.sendMail(mailOption, (error, info) => {
//       if (error) {
//         throw new Error("Failed to send Email");
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = sendMail
const nodemailer = require("nodemailer");

const sendMail = async (otp, email) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail", // note lowercase 'gmail'
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password OTP",
      html: `<div>Your OTP is <b>${otp}</b></div>`,
    };

    let info = await transport.sendMail(mailOption);
    console.log("Email sent: ", info.response);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send Email");
  }
};
module.exports = sendMail;
