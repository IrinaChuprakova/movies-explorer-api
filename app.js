require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/diplomdb');
app.use(cors());
// app.use(cookieParser());
app.use(bodyParser.json());

app.use(router);

app.use(errors());

app.listen(PORT);
