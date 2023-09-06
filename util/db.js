const mongoose = require('mongoose');


// connect to db
module.exports = function connectDB() {
    mongoose.connect(process.env.MONGO_URI);
    const db =  mongoose.connection;
    db.on('error', e => console.log(e.message));
    db.on('open', () => console.log('MongoDb connected'));
    db.on('close', () => console.log('MongoDb Disconnected'));
}