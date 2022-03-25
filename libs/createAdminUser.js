const config = require("../config")
const Auth = require("../models/Auth");

const createAdminUser = async () => {
  const userFound = await Auth.findOne({email: "eppur@gmail.com"});
  if (userFound) return;
  const newUser = new Auth({
    firstname: "Eppur",
    lastname: "Adminstrator",
    phone: 1166161929,
    email: config.ADMIN_EMAIL,
    isAdmin: true
  });

  newUser.password = await newUser.encryptPassword(config.ADMIN_PASSWORD);

  return await newUser.save();
};

module.exports = createAdminUser