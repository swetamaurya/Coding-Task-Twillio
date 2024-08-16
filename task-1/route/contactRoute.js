const express = require("express")
const dotenv = require("dotenv");
const { getContact ,createContact , updateContact , deleteContact} = require("../controllers/contactControllers");
const route = express.Router();
dotenv.config()
 
route.get("/getContact",getContact)
route.post("/createContact",createContact )
route.post("/updateContact",updateContact)
route.post("/deleteContact",deleteContact )       


module.exports = route;