const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();

mongoose.connect('mongodb://localhost/help_founder', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => console.log("Connected"))


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);


const PORT = process.env.PORT || 2000;


var server = app.listen(PORT, console.log("Welcome", PORT));

