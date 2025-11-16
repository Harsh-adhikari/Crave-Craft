// before writing the code install mongoose package (npm i mongoose)
const mongoose = require("mongoose");

const connectDb=async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("Database connected..."))
}

module.exports=connectDb