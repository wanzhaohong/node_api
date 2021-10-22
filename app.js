// Requires Express to set up the server
const express = require('express');
const app = express();

// Requries the Mongoose to connect to the MongoDB
const Mongoose = require('mongoose');
require('dotenv/config');

// require body-parser, so we can change the request data to JSON.
// const bodyParser = require('body-parser');

//Import Routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

//Import CORS
const cors = require('cors');

// Requires the db_connection link from .env file, so the api can connect to the MongoDB
require('dotenv').config();

/****************************************************** */
//Connection to MongoDB
Mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected.'))
    .catch(err => console.log(err));

/* **************************************************** */
// Middlewares example
// app.use('/posts', () => {
//     console.log('This is a middleware running.');
// });

app.use(cors());

// Middleware to make data be JSON
app.use(express.json());

// For each specific route.(Routes Middleware)
app.use('/posts', postsRoute);
app.use('/api/user', authRoute);


// ROUTES
// For Home Page
app.get('/', (request, response) => {
    response.send("Home Page");
});

// Start listen to the server
app.listen(3000, () => {
    console.log('Server is running.');
}); 
