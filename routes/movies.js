const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/', deleteMovie);

module.exports = moviesRouter;
