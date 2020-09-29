const mongoose = require('mongoose');

global.g_dbConnected = false;

module.exports = function(dbPath = Text) {
    mongoose
        .connect(dbPath, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('Connected to mongoDB');
            g_dbConnected = true;
            mongoose.connection.on('disconnected', handleDisconnect)
        })
        .catch(err => console.log(err));
}

function handleDisconnect() {
    g_dbConnected = false;
}