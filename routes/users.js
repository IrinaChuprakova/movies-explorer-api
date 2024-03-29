const userRouter = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validation');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValidator, updateUser);

module.exports = userRouter;
