// Imports
const mongoose = require('mongoose');
const config = require('../config')

// Connecting to database
const database = ()=>{
    mongoose
        .connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=> console.log('Mongo DB is connected'))
        .catch((err)=> console.log(err))
}

// Exports
module.exports = database