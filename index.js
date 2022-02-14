const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const bookRouter = require('./routes/bookRouter')(Book);
const userRouter = require('./routes/userRouter')(User);
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all('/api/*', jwt({
    secret: 'secret',
    algorithms: ['HS256']
}).unless({
    path: ['/api/users/login']
}))
app.use('/api', bookRouter,userRouter);
app.listen(8080);

