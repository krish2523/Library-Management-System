const express = require("express");
const dotenv = require('dotenv');

//Database Connection
const DbConnection= require("./databaseConnection");
// importing routes
const userRoutes = require("./routes/users.js");
const bookRoutes = require("./routes/books.js");
const app=express();
dotenv.config();
DbConnection();

app.use(express.json());
const port = 8081;


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is up and ready"
    })
})
app.use("/users",userRoutes);
app.use("/books",bookRoutes);




app.all("*",(req,res)=>{
    res.status(500).json({
        message:"This route does not exist"
    })
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})