const mongoose = require('mongoose');

module.exports = function(dbPath = Text) {
    mongoose
        .connect(dbPath, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => { console.log('Connected to mongoDB') });
}