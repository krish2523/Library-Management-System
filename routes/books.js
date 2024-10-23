const express = require("express");
// JSON data import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");


const router = express.Router();

const {UserModel,BookModel}= require("../models")
const {getAllBooks} = require("../controllers/books-controllers");
/* ## /books
Get: Get all books*/
router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
})
/* ## /books/:id
Get: Get book by id*/
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=> each.id === id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }
    return res.status(200).json({
        success:true,
        data:book
    })
})
/* ## /books/issued
Get: Get the issued books */
router.get("/issued/books",(req,res)=>{
    const userswithIssuedBooks= users.filter((each)=>{
        if(each.issuedBook)return each;
    })
    const issuedBooks = [];
    userswithIssuedBooks.forEach((each)=>{
    const book = books.find((book)=> book.id === each.issuedBook)

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate= each.returnDate;

    issuedBooks.push(book)
    })
    if(issuedBooks.length===0)
        return res.status(404).json({
        success:false,
        message:"No issued books yet"
    })

    return res.status(200).json({
        success:true,
        data:issuedBooks
    })
})

/* ## /books
Post: Add a new book */

router.post("/",(req,res)=>{
   const {data} = req.body;
   if(!data){
    return res.status(400).json({
        success:false,
        message:"Invalid request"
        })
        }
        const book =  books.find((each)=> each.id === data.id)
        if(book){
            return res.status(400).json({
                success:false,
                message:"Book already exists"

            })
        }
        const allBooks = [...books, data]  
        return res.status(200).json({
            success:true,
            data:allBooks
        })
})
/* ## /books/:id
Put: Update a book */
router.put("/:id",(req,res)=>{
    const {id}= req.params;
    const {data} = req.body;

     const book = books.find((each)=>each.id === id);
    if(!book){
        return res.status(404).json({
            sucess:false,
            message:"book not found"
        })
    }
    const updateBook = books.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data
            };
        }
        return each
    })
    return res.status(200).json({
        success:true,
        data:updateBook
    })
})

module.exports=router;