const mongoose = require('mongoose');
const config = require('../config/config')

const database = ()=>{
    mongoose
        .connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=> console.log('Mongo DB is connected'))
        .catch((err)=> console.log(err))
}

module.exports = database