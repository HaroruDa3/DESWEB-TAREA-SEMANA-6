const express =require('express');
const app=express();
const {createUser,authUser} = require('../controllers/userController');

app.post('/createUser',createUser);
app.post('/authUser',authUser);

module.exports = app;