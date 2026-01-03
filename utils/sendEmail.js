// import nodemailer from "nodemailer";
// import config from "../config/config.js";

// const transporter = nodemailer.createTransport({
//   host: config.smtpHost,
//   port: config.smtpPort,
//   secure: true, // 465 ke liye true
//   auth: {
//     user: config.emailUser,
//     pass: config.emailPass,
//   },
// });

// export const sendEmail = async ({ to, subject, html }) => {
//   return transporter.sendMail({
//     from: `"Bitmax Franchise" <${config.emailUser}>`,
//     to,
//     subject,
//     html,
//   });
// };


import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: Number(config.smtpPort), // IMPORTANT
  secure: false, // ❌ 465 ke liye hota hai | 587 ke liye false
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
  tls: {
    rejectUnauthorized: false, // hosting SMTP ke liye common
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Bitmax Franchise" <${config.emailUser}>`,
    to,
    subject,
    html,
  });
};
