const express = require('express');
require('express-async-errors');
require('dotenv').config();

const dbPath = process.env.DB_PATH;
const app = express();

//require('./startup/errorHandlerStartup.js')(dbPath);
require('./startup/dbStartup.js')(dbPath);
require('./startup/expressStartup.js')(app);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));