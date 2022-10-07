const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movie) => res.send({ movie }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => { throw new NotFoundError('Карточка с указанным id не найдена'); })
    .then((movie) => {
      if (req.user._id !== movie.owner._id.valueOf()) {
        throw new Forbidden('Карточки может удалять только создатель');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ movie }))
        .catch(next);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
