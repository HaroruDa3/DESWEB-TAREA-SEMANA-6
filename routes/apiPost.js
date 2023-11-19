const express = require('express');
const app = express();
const {createPost,deletePost} = require('../controllers/postInfoController');
const {validarCookie} =require('../helpers/helperCookie.js') 

app.post('',validarCookie,createPost);
app.delete('/:id',validarCookie, deletePost);

module.exports = app;