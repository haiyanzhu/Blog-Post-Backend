//Import necessary modules or dependencies
const express = require('express');
const mongoose = require('mongoose');
//when set .env enviroment variable, we can use it directely here;
require('dotenv').config();


//Make an instance of Express App
const app = express();


//Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    if (req.body) {
        console.log('Request body: ');
        console.log(req.body);
    }
    next();
})



//Routes, saying any http requests coming from /api/posts/ are handled by the middleware defind in './src/routes/post'
//Routes tell the client application how the routes to access the server by using CRUD operations under certain route;
//set the routes before server start to listen to the port, if the order is reversed(start listening before setting the routes, then server will listen to request from all the path)
app.use('/api/posts/', require('./src/routes/post'));
app.use('/api/users', require('./src/routes/user'));




//Connect to MongoDb or Database remotely
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error in connecting to MongoDB:', error.message);
    });

//start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});