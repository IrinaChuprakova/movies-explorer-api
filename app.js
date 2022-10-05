require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/diplomdb');

app.use(router);

app.listen(PORT);
