require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/restful-auth-apis');

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

const userRoutes = require('./routes/userRoutes');

app.use('/api', userRoutes);

app.listen(PORT, () => {

    console.log(`Great Your Server Is Started on ${PORT}`);
})