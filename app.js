const express = require('express');
const dbHelper = require('./src/helpers/dbHelper');
const loadRoutes = require('./src/Routes');
const CONST = require('./src/helpers/constants');
const app = express();

require('dotenv').config();

app.use(express.json({limit: '30mb'}));

dbHelper.createConnection().then(() => {
    console.log('db connected');
}).catch((error) => {
    console.log('database not connected', error);
});

app.use(CONST.API_PREFIX,loadRoutes);

module.exports = app;