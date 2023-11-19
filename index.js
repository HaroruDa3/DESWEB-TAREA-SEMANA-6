const express = require('express');
const app = express();

const apiUser =require('./routes/apiUser');
const apiPost = require('./routes/apiPost');

app.use(express.json());
app.use('/api/user', apiUser)
app.use('/api/postInfo', apiPost)

app.listen(3000);