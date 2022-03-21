// Imports
const app = require('./app')
const database = require('./database/database')

// Setting PORT
app.set('port', process.env.PORT || 8080)

// Running server and database
app.listen(app.get('port'),  () => console.log('Server on PORT', app.get('port')))
database()
