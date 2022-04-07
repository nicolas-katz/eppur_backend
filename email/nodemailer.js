const { createTransport } = require("nodemailer");
const config = require('../config')

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'nicokatz12@gmail.com',
    pass: 'hordeatiigjmpfhz'
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
      console.error(e);
    }
};

const renderNewUser = (newUser) => {
    const { firstname, lastname, phone, email, role, _id, createdAt } = newUser;
    return `
      <h1>Nuevo Usuario | ${_id}</h1>
      <p>Fecha De Creación: ${createdAt}</p>
      <table>
         <tbody>
          <tr>
            <td>Nombre completo</td>
            <td>${firstname} ${lastname}</td>
          </tr>
          <tr>
            <td>Telefono</td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td>Correo</td>
            <td>${email}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td>${role}</td>
          </tr>
        </tbody>
    </table>`
}

module.exports = {
    sendEmail,
    renderNewUser
}