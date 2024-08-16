const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const Contact = require("../model/contactModel");

const route = express.Router();
dotenv.config()

// get all Contact
async function getContact (req,res){
    try {
        const getAllContact = await Contact.find()
        return res.status(200).send(getAllContact)
    } catch (error) {
        console.log(error.meassge)
        return res.status(400).send(`Internal server error : ${error.meassge}`)
    }
}

async function createContact(req, res) {
    try {
        const { first_name, last_name, email, mobile_number  } = req.body;
        console.log("user", req.body);

         const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(400).send("A contact with this email already exists.");
        }

        // Create and save the new contact
        const contact = new Contact({
            first_name,
            last_name,
            email,
            mobile_number 
        });

        await contact.save();
        // console.log("createUser", createUser);
        return res.status(200).send("Contact created successfully.");
    } catch (error) {
        console.log(`${error.message}`);
        return res.status(400).send(`Internal server error: ${error.message}`);
    }
}


async function updateContact(req, res) {
    try {
        const { contact_id, new_email, new_mobile_number } = req.body;

        if (!contact_id) {
            return res.status(400).send("Contact ID is required.");
        }
 
        const updatedContact = await Contact.findOneAndUpdate(
            {  _id: contact_id },  
            { email: new_email, mobile_number: new_mobile_number }
            
        );

        if (!updatedContact) {
            return res.status(404).send("Contact not found.");
        }

        return res.status(200).send({msg :"Contact updated successfully.", updatedContact});
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send(`Internal server error: ${error.message}`);
    }
}



async function deleteContact(req, res) {
    try {
        const { contact_id } = req.body;

         const deletedContact = await Contact.findOneAndDelete(contact_id );

        if (!deletedContact) {
            return res.status(404).send("Contact not found.");
        }
        return res.status(200).send("Contact deleted successfully.");
    } catch (error) {
        console.log(`${error.message}`);
        return res.status(400).send(`Internal server error: ${error.message}`);
    }
}

module.exports = {getContact , createContact , updateContact , deleteContact};