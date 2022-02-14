const express = require('express');
const usersController = require('../controllers/userController');
const validator = require('express-joi-validation').createValidator();
const bodyValidator = require('../validations/bodyValidatorUser');
const queryValidator = require('../validations/queryValidatorUser');
const idValidator = require('../validations/idValidator');

const routes = (User) => {
    const userRouter = express.Router();

    const { getUsers, postUsers, getUserById, getUserByUserName, putUsers, deleteUsers, login } = usersController(User);

    userRouter.route('/users')
        .get(validator.query(queryValidator), getUserByUserName, getUsers)
        .post(validator.body(bodyValidator), postUsers)
        
    userRouter
        .route('/users/:userId')
        .get(validator.params(idValidator), getUserById)
        .put(validator.params(idValidator), validator.body(bodyValidator), putUsers)
        .delete(validator.params(idValidator), deleteUsers)

    userRouter.route('/users/login')
        .post(login)

        return userRouter;
}
module.exports = routes;
