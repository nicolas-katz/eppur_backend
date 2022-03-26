// Imports
require('dotenv').config();

// ENV Configurations
const Configurations = {
  PORT: process.env.PORT || 3001,
  SESSION_SECRET: process.env.SESSION_SECRET || "eppurapp",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "eppur@gmail.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "eppuradmin",
  MONGODB_HOST: process.env.MONGODB_HOST || "eppur_db",
  MONGODB_PASS: process.env.MONGODB_PASS || "eppur_db",
  MONGODB_DATABASE: process.env.MONGODB_DB || "eppur",
  MONGODB_URI: `mongodb+srv://${process.env.MONGODB_HOST || "eppur_db"}:${
    process.env.MONGODB_PASS || "eppur_db"}@cluster0.abwda.mongodb.net/${process.env.MONGODB_DATABASE || "eppur"}?retryWrites=true&w=majority`,
};

// Exports
module.exports = Configurations;
