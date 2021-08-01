const mongoose = require('mongoose');

global.g_dbConnected = false;

module.exports = function(dbPath = Text) {
    mongoose
        .connect(dbPath, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('Connected to mongoDB');
            g_dbConnected = true;
            mongoose.connection.on('disconnected', () => {
                g_dbConnected = false;
            })
        })
        .catch(err => console.log(err));
}