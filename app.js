const express = require('express');
const dbHelper = require('./src/helpers/dbHelper');
const loadRoutes = require('./src/Routes');
const CONST = require('./src/helpers/constants');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(cors({
    origin:'*'
}))
require('dotenv').config();

app.use(helmet());

app.use(express.json({limit: '30mb'}));

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.get('/createPost', (req, res) => {
    res.sendFile(path.join(__dirname, 'src','public', 'index.html'));
});

app.get('/',(req,res) => {
    res.send(`<h1>hello</h1>`)
})

app.use('/uploads', express.static('uploads'));

dbHelper.createConnection().then(() => {
    console.log('db connected');
}).catch((error) => {
    console.log('database not connected', error);
});

app.use(CONST.API_PREFIX,loadRoutes);

module.exports = app;