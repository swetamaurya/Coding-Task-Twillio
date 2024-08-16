const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connection = require("./database/db")
const ContactRoute = require("./route/contactRoute")
dotenv.config()

PORT = process.env.PORT || 6000

app.use(express.json())

app.use("/",ContactRoute)

app.get("/test",(req,res)=>{
    return res.status(200).send("Running Contact💁")
})
app.listen(PORT , async()=>{
    try{
    await connection
    console.log("MongoDB is connected.")
}catch{
    console.log(`Internal server error : ${error.message}`)
}
})
console.log(`Running PORT is : ${PORT}`)