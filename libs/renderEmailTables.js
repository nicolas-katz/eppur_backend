const renderNewUser = (newUser) => {
    const { firstname, lastname, phone, email, role, _id, createdAt } = newUser;
    return `
      <h1>Se ha registrado un nuevo usuario</h1>
      <table class="table">
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

const renderNewUserClient = (newUser) => {
  const { firstname } = newUser;
  return `
    <h1>¡Ya eres un Eppurer!</h1>
    <p>Hola ${firstname}! Esperamos que estés bien. Nos ponemos en contacto con vos para contarte un poco más acerca de nosotros y cómo funciona nuestra nueva tienda virtual.</p>
    <h4>¿Quienes Somos?</h4>
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    <h4>Nuestra Tienda</h4>
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    <h4>Métodos De Pago & Envíos</h4>
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    <h4>Politicas De Cambios & Devoluciones</h4>
    <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    <h5>Equipo Eppur.</h5>
    <h6>Si tienes más consultes, visita nuestro sitio web en la sección de Contacto o escribinos directamente a nuestro email eppur@gmail.com.</h6>
  `
}

const renderNewOrder = (newOrder) => {
  return `
    <h1>Nueva Orden</h1>
  `
}

const renderClientOrder = (newOrder) => {
  return `
    <h1>Nueva Orden</h1>
  `
}
module.exports = {
    renderNewUser,
    renderNewUserClient,
    renderNewOrder,
    renderClientOrder
}