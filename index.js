// Imports
const app = require('./app')
const database = require('./database/database')
const config = require('./config')
const createAdminUser = require('./libs/createAdminUser')

// Setting PORT
app.set('port', config.PORT)

// Running server and database
app.listen(app.get('port'),  () => {
    console.log('Server on PORT', app.get('port'))
    createAdminUser()
})
database()
