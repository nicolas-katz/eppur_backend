require('dotenv').config();

const Configurations = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  USER_NODEMAILER: process.env.USER_NODEMAILER,
  PASS_NODEMAILER: process.env.PASS_NODEMAILER,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_EXPIRATION: process.env.SESSION_EXPIRATION,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  SUPER_ADMIN_EMAIL: process.env.ADMIN_EMAIL ,
  SUPER_ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  MONGODB_HOST: process.env.MONGODB_HOST,
  MONGODB_PASS: process.env.MONGODB_PASS,
  MONGODB_DATABASE: process.env.MONGODB_DB,
  MONGODB_URI: `mongodb+srv://${process.env.MONGODB_HOST || "eppur_db"}:${
    process.env.MONGODB_PASS || "eppur_db"}@cluster0.abwda.mongodb.net/${process.env.MONGODB_DATABASE || "eppur"}?retryWrites=true&w=majority`,
};

module.exports = Configurations;
