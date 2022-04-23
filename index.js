const app = require('./app')
const database = require('./database/database')
const config = require('./config/config')
const createAdminUser = require('./libs/createAdminUser')

app.set('port', config.PORT)

app.listen(app.get('port'),  () => {
    console.log('Server on PORT', app.get('port'))
    createAdminUser()
})
database()
