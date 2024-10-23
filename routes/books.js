const express = require("express");
// JSON data import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");


const router = express.Router();

const {UserModel,BookModel}= require("../models")
const {getAllBooks,getSingleBookById,getAllIssuedBooks, addNewBook, UpdateBook} = require("../controllers/books-controllers");

/* ## /books
Get: Get all books*/
router.get("/",getAllBooks);
/* ## /books/:id
Get: Get book by id*/
router.get("/:id",getSingleBookById);
/* ## /books/issued
Get: Get the issued books */
router.get("/issued/books",getAllIssuedBooks);

/* ## /books
Post: Add a new book */

router.post("/",addNewBook);
/* ## /books/:id
Put: Update a book */
router.put("/:id",UpdateBook);

module.exports=router;