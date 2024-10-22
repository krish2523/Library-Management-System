const express = require("express");
// JSON data import
const {users} = require("../data/users.json");

const router = express.Router();

/* ## /users
GET: Get all list of the users*/
router.get("",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})
/* ## /users/:id
GET: Get single user by id*/
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    return res.status(200).json({
        success:true,
        data:user
    })
})
/* ## /users
Post:Create a new user*/
router.post("",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}= req.body;
    const user = users.find((each)=>each.id === id);
    if(user){
        return res.status(404).json({
            sucess:false,
            message:"User already exist with the given id"
        })
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate

    });
    return res.status(201).json({
        success:true,
        data:users
    })
})
/* ## /users/:id
Put: Update A user by id*/
router.put("/:id",(req,res)=>{
    const {id}= req.params;
    const {data} = req.body;

     const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
            sucess:false,
            message:"User not found"
        })
    }
    const updateUser = users.map((each)=>{
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
        data:updateUser
    })
})
/* ## /users/:id
Delete: Deleting a user by id*/
router.delete("/:id",(req,res)=>{
    const {id}= req.params;
    const user = users.find((each)=>each.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    const index= users.indexOf(user);
    users.splice(index,1);
    return res.status(200).json({
        success:true,
        message:"User deleted successfully" 
    })
                
})
/* ## /users/subscription-details/:id
GET: get all subscription details*/
router.get("/subscription-details/:id",(req,res)=>{
    const{id}=req.params;
    const user= users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    const getDateInDays = (data = "") =>{
        let date;
        if(data === ""){
            date = new Date();
        }else{
            date=new Date(data);
        
        }
        let days = Math.floor(date/(1000*60*60*24));
        return days
    
    };
    const subscriptionType = (date)=>{
        if(user.subscriptionType === "Basic"){
            date = date + 90
        } if(user.subscriptionType === "Standard"){
            date = date + 180
        } if(user.subscriptionType === "Premium"){
            date = date + 365
        }
        return date;
    };
    // Subscription expiration calc
    // Jan 1 1970 // milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration< currentDate,
        daysLeftForExpiration:subscriptionExpiration<=currentDate ? 0: subscriptionExpiration - currentDate,
        fine: returnDate<currentDate?subscriptionExpiration<=currentDate?200:100:0,

    }
    return res.status(200).json({
        success:true,
        data:data
    })
})
module.exports= router;