const express = require('express');
const booksController = require('../controllers/bookController');
const validator = require('express-joi-validation').createValidator();
const bodyValidator = require('../validations/bodyValidatorBook');
const queryValidator = require('../validations/queryValidatorBook');
const idValidator = require('../validations/idValidator');

const routes = (Book) => {
    const bookRouter = express.Router();

    const { getBooks, postBooks, getBookById, putBooks, deleteBooks, getBooksBySearch } = booksController(Book);

    bookRouter.route('/books')
        .get(getBooks)
        .post(validator.body(bodyValidator), postBooks)
        
    bookRouter.route('/books/search')
        .get(validator.query(queryValidator), getBooksBySearch)

    bookRouter
        .route('/books/:bookId')
        .get(validator.params(idValidator), getBookById)
        .put(validator.params(idValidator), validator.body(bodyValidator), putBooks)
        .delete(validator.params(idValidator), deleteBooks)
    return bookRouter;
}

module.exports = routes;