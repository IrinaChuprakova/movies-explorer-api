require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/erros');

const { PORT = 3000, NODE_ENV, MONGOBD } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGOBD : 'mongodb://localhost:27017/moviesdb');
app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
