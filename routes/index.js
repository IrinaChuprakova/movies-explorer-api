const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signupValidator, signinValidator } = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/api/signin', signinValidator, login);

router.post('/api/signup', signupValidator, createUser);

router.use('/api/users', auth, require('./users'));

router.use('/api/movies', auth, require('./movies'));

router.use('/api/*', auth, () => { throw new NotFoundError('Произошла ошибка'); });

module.exports = router;
