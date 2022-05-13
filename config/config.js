require('dotenv').config();

const Configurations = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  USER_NODEMAILER: process.env.USER_NODEMAILER || "nicokatz12@gmail.com",
  PASS_NODEMAILER: process.env.PASS_NODEMAILER || "cqpfkrhwatdvneiq",
  SESSION_SECRET: process.env.SESSION_SECRET || "eppurapp",
  SESSION_EXPIRATION: process.env.SESSION_EXPIRATION || 604800,
  TOKEN_SECRET: process.env.TOKEN_SECRET || "eppurtoken",
  SUPER_ADMIN_EMAIL: process.env.ADMIN_EMAIL || "eppur@gmail.com",
  SUPER_ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "eppuradmin",
  FIRST_ADMIN_EMAIL: process.env.FIRST_ADMIN_EMAIL || "juliankellmer@gmail.com",
  SECOND_ADMIN_EMAIL: process.env.SECOND_ADMIN_EMAIL || "martinwaisburg@gmail.com",
  MONGODB_HOST: process.env.MONGODB_HOST || "eppur_db",
  MONGODB_PASS: process.env.MONGODB_PASS || "eppur_db",
  MONGODB_DATABASE: process.env.MONGODB_DB || "eppur",
  MONGODB_URI: `mongodb+srv://${process.env.MONGODB_HOST || "eppur_db"}:${
    process.env.MONGODB_PASS || "eppur_db"}@cluster0.abwda.mongodb.net/${process.env.MONGODB_DATABASE || "eppur"}?retryWrites=true&w=majority`,
};

module.exports = Configurations;
