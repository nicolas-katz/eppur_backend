// Imports
const mongoose = require('mongoose');

// Connecting to database
const database = ()=>{
    mongoose
        .connect('mongodb+srv://eppur_db:eppur_db@cluster0.abwda.mongodb.net/eppur?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=> console.log('Mongo DB is connected'))
        .catch((err)=> console.log(err))
}

// Exports
module.exports = database