const { createTransport } = require("nodemailer");
const config = require('../config/config')

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: config.USER_NODEMAILER,
    pass: config.PASS_NODEMAILER
  },
});

const sendEmail = async (from, to, subject, message) => {
    try {
      const mailOptions = {
        from,
        to,
        subject,
        html: message
      };
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.log(e);
    }
};

module.exports = sendEmail