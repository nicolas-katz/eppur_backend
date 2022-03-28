const config = require("../config")
const Auth = require("../models/Auth");

const createAdminUser = async () => {
  const userFound = await Auth.findOne({email: "eppur@gmail.com"});
  if (userFound) return
  else {
    const newUser = new Auth({
      firstname: "Eppur",
      lastname: "Adminstrator",
      phone: 1166161929,
      email: config.SUPER_ADMIN_EMAIL,
      isAdmin: true,
      isSuperAdmin: true
    });
    
    newUser.password = await newUser.encryptPassword(config.SUPER_ADMIN_PASSWORD);

    return await newUser.save();
  }
};

module.exports = createAdminUser