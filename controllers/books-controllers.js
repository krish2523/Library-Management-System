const {UserModel,BookModel}= require("../models");
const IssuedBook = require("../dtos/book-dto");
exports.getAllBooks= async(req,res)=> {
    const books = await BookModel.find();
    if(books.length===0)
        return res.status(404).json({
        success:false,
        message: "NO BOOK FOUND"
    })
    return res.status(200).json({
        success:true,
        data:books
    })
};
exports.getSingleBookById =async(req,res) => {
    
    const {id} = req.params;
    const book = await BookModel.findById(id);
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
};
exports.getAllIssuedBooks = async(req,res)=>{
    
    const userswithIssuedBooks= await UserModel.find({
        issuedBook:{$exists:true},
    }).populate("issuedBook")
        //DTOs: Data Transform Object
    const issuedBooks = users.map((each)=>new IssuedBook(each))
    if(issuedBooks.length===0)
        return res.status(404).json({
        success:false,
        message:"No issued books yet"
    })

    return res.status(200).json({
        success:true,
        data:issuedBooks
    })
};
exports.addNewBook= async(req,res)=>{
   
   const {data} = req.body;
   if(!data){
    return res.status(400).json({
        success:false,
        message:"Invalid request"
        })
        }
       await BookModel.create(data);

       const allBooks= await BookModel.find();
      
        return res.status(200).json({
            success:true,
            data:allBooks
        })
};
exports.UpdateBook= async(req,res)=>{
    const {id}= req.params;
    const {data} = req.body;

     const updatedbook = await BookModel.findOneAndUpdate({
        _id: id,
     },data,{
        new:true
     })
    return res.status(200).json({
        success:true,
        data:updatedbook
    })
}
