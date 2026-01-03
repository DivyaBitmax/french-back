import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

export default config;
