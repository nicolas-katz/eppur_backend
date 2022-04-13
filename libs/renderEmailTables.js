const renderNewUser = (newUser) => {
    const { firstname, lastname, phone, email, role, _id, createdAt } = newUser;
    return `
      <h1>Nuevo Usuario</h1>
      <table>
         <tbody>
          <tr>
            <td>ID</td>
            <td>${_id}</td>
          </tr>
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
          <tr>
            <td>Date</td>
            <td>${createdAt}</td>
          </tr>
        </tbody>
    </table>`
}

const renderNewOrder = (newOrder) => {

}

module.exports = {
    renderNewUser,
    renderNewOrder
}